"use client";

import { useSearchParams } from "next/navigation";
import { Fragment, useEffect } from "react";

import {
  Board,
  FormationBoard,
  FormationOverview,
  FormationPartyCard,
  useFormationStore,
  useGetFormation,
} from "@/features/formation";

export default function FormationFormulaPage() {
  const searchParams = useSearchParams();
  const formationId = searchParams.get("id") ?? "";

  const {
    dragging,
    dragOffset,
    sourceBoard,
    dataSource,
    showClone,
    clonePosition,
    onSetDataSource,
    onSetClonePosition,
    onSetHoverBoard,
    onSetDragging,
    onSetSourceBoard,
    onSetDragOffset,
    onSetShowClone,
    onReset,
  } = useFormationStore();

  const { data } = useGetFormation({ formationId });

  const handleDragMove = (e: React.MouseEvent): void => {
    if (!dragging) return;

    onSetClonePosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });

    const governmentBoard = document.getElementById("government-board");
    const oppositionBoard = document.getElementById("opposition-board");
    const otherBoard = document.getElementById("other-board");

    if (!governmentBoard || !oppositionBoard || !otherBoard) return;

    const governmentRect = governmentBoard.getBoundingClientRect();
    const oppositionRect = oppositionBoard.getBoundingClientRect();
    const otherRect = otherBoard.getBoundingClientRect();

    if (
      e.clientX >= governmentRect.left &&
      e.clientX <= governmentRect.right &&
      e.clientY >= governmentRect.top &&
      e.clientY <= governmentRect.bottom
    ) {
      onSetHoverBoard("government");
    } else if (
      e.clientX >= oppositionRect.left &&
      e.clientX <= oppositionRect.right &&
      e.clientY >= oppositionRect.top &&
      e.clientY <= oppositionRect.bottom
    ) {
      onSetHoverBoard("opposition");
    } else if (
      e.clientX >= otherRect.left &&
      e.clientX <= otherRect.right &&
      e.clientY >= otherRect.top &&
      e.clientY <= otherRect.bottom
    ) {
      onSetHoverBoard("other");
    } else {
      onSetHoverBoard(null);
    }
  };

  const handleDragEnd = (targetBoard: Board | null): void => {
    if (!dragging) return;

    if (sourceBoard && targetBoard && sourceBoard !== targetBoard) {
      // Move the card only if it was dropped on a board
      const card = dragging;

      if (card) {
        const newColumns = { ...dataSource };
        // Remove from source board
        newColumns[sourceBoard] = dataSource[sourceBoard].filter(
          (item) => item.id !== dragging.id,
        );

        // Add to target board
        newColumns[targetBoard] = [...dataSource[targetBoard], card].sort(
          (a, b) => b.count - a.count,
        );
        onSetDataSource(newColumns);
      }
    }

    onSetDragging(null);
    onSetSourceBoard(null);
    onSetShowClone(false);
    onSetHoverBoard(null);
    onSetDragOffset({ x: 0, y: 0 });
  };

  const handleBoardDrop = (e: React.MouseEvent, board: Board): void => {
    e.preventDefault();
    e.stopPropagation();
    handleDragEnd(board);
  };

  const handleMouseEnterBoard = (board: Board): void => {
    if (!dragging || !sourceBoard) return;
    onSetHoverBoard(board);
  };

  const handleMouseLeaveBoard = (): void => {
    onSetHoverBoard(null);
  };

  useEffect(() => {
    if (!data) return;

    const {
      governmentPartyRefCodes,
      oppositionPartyRefCodes,
      otherPartyRefCodes,
    } = data;

    onSetDataSource({
      government: governmentPartyRefCodes,
      opposition: oppositionPartyRefCodes,
      other: otherPartyRefCodes,
    });

    return () => onReset();
  }, [data, onReset, onSetDataSource]);

  return (
    <Fragment>
      <div
        className="flex grid-cols-1 flex-col overflow-auto md:bg-red-300 lg:h-screen lg:bg-blue-300 xl:grid xl:grid-cols-[1fr,max(923px,64%)] xl:bg-green-300 xl:pl-6"
        onMouseMove={handleDragMove}
        onMouseUp={() => handleDragEnd(null)}
      >
        <FormationOverview formation={data} />
        <div className="grid h-full grid-cols-1 grid-rows-[1fr,150px] xl:grid-cols-[1fr,12%] xl:grid-rows-none">
          <FormationBoard
            handleBoardDrop={handleBoardDrop}
            handleMouseEnterBoard={handleMouseEnterBoard}
            handleMouseLeaveBoard={handleMouseLeaveBoard}
          />
        </div>

        {/* Dragging Clone */}
        {showClone && dragging && sourceBoard && (
          <div
            className="fixed cursor-grab shadow-md"
            style={{
              left: `${clonePosition.x}px`,
              top: `${clonePosition.y}px`,
              pointerEvents: "none",
              zIndex: 1000,
              width: `${dragging?.width ?? 98}px`,
              height: `${dragging?.height ?? 123}px`,
            }}
          >
            <FormationPartyCard board={sourceBoard} party={dragging} />
          </div>
        )}
      </div>
    </Fragment>
  );
}
