import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Fragment, useCallback } from "react";

import { useBreakpoint } from "@/hooks/use-breakpoint";
import { PartyCount } from "@/types";

import { useFormationStore } from "../../store";
import { Board } from "../../types";
import { FormationPartyCard } from "../formation-party-card";

type FormationBoardProps = {
  handleMouseLeaveBoard: () => void;
  handleMouseEnterBoard: (board: Board) => void;
  handleBoardDrop: (e: React.MouseEvent, board: Board) => void;
};

export const FormationBoard = ({
  handleBoardDrop,
  handleMouseEnterBoard,
  handleMouseLeaveBoard,
}: FormationBoardProps) => {
  const {
    dataSource,
    dragging,
    hoverBoard,
    sourceBoard,
    onSetHoverBoard,
    onSetDragOffset,
    onSetDragging,
    onSetSourceBoard,
    onSetClonePosition,
    onSetShowClone,
    onSwapFormation,
  } = useFormationStore();
  const breakpoint = useBreakpoint();

  const { government, opposition } = dataSource;

  const govermentCount = dataSource.government.reduce(
    (acc, party) => acc + party.count,
    0,
  );
  const oppositionCount = dataSource.opposition.reduce(
    (acc, party) => acc + party.count,
    0,
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent, party: PartyCount, board: Board) => {
      e.preventDefault();

      const card = document.getElementById(`party-${party.id}`);
      if (!card) return;

      const rect = card.getBoundingClientRect();

      // Update dragOffset using setState instead of useRef
      const newDragOffset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      onSetDragOffset(newDragOffset);

      onSetHoverBoard(board);
      onSetDragging({ ...party, width: rect.width, height: rect.height });
      onSetSourceBoard(board);
      onSetClonePosition({
        x: e.clientX - newDragOffset.x,
        y: e.clientY - newDragOffset.y,
      });
      onSetShowClone(true);
    },
    [
      onSetClonePosition,
      onSetDragOffset,
      onSetDragging,
      onSetHoverBoard,
      onSetShowClone,
      onSetSourceBoard,
    ],
  );

  return (
    <Fragment>
      <div className="grid grid-rows-2 gap-4 py-4 md:mx-6 xl:my-4 xl:py-0">
        <div
          id="government-board"
          className="relative z-[1] flex size-full flex-col"
          onMouseUp={(e) => handleBoardDrop(e, "government")}
          onMouseEnter={() => handleMouseEnterBoard("government")}
          onMouseLeave={handleMouseLeaveBoard}
        >
          <div
            className={
              "relative z-10 mb-[-1.5px] flex w-[56%] items-center justify-between rounded rounded-b-none border border-b-0 border-[#C18821] bg-[#F2EADB] px-3 py-2 transition-colors md:w-[36%]"
            }
            style={{
              ...(hoverBoard === "government" && {
                backgroundColor: "#eee2ce",
              }),
            }}
          >
            <h3 className="text-base font-bold text-[#C18821] md:text-2xl">
              ฝ่ายรัฐบาล
            </h3>
            <span className="rounded bg-[#C18821] px-3 py-1 text-white">
              <span className="text-base font-bold md:text-2xl">
                {govermentCount}
              </span>{" "}
              ที่นั่ง
            </span>
          </div>
          <div
            className={
              "grid h-full grid-cols-10 gap-2 rounded rounded-tl-none border border-[#C18821] bg-[#F2EADB] p-3 transition-colors xl:grid-cols-7 xl:grid-rows-2"
            }
            style={{
              ...(hoverBoard === "government" && {
                backgroundColor: "#eee2ce",
              }),
              ...(["xl", "2xl"].includes(breakpoint ?? "") &&
                government.length > 14 && {
                  gridTemplateColumns: `repeat(${Math.ceil(government.length / 2)}, 1fr)`,
                }),
              ...(breakpoint === "lg" &&
                government.length > 10 && {
                  gridTemplateColumns: `repeat(${government.length}, 1fr)`,
                }),
            }}
          >
            {dataSource.government.map((party) => (
              <FormationPartyCard
                key={party.id}
                party={party}
                board="government"
                handleDragStart={handleDragStart}
                isDragging={dragging?.id === party.id}
              />
            ))}
          </div>

          {sourceBoard && sourceBoard !== "government" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-1/2 z-[5] -translate-x-1/2 text-center"
            >
              <motion.div
                animate={
                  hoverBoard === "government"
                    ? { y: [0, -10, 0] }
                    : { y: [0, 0, 0] }
                }
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                className="mx-auto flex size-16 items-center justify-center rounded-full bg-white text-lg font-medium text-[#C18821] shadow-sm"
              >
                <Icon
                  icon="material-symbols:arrow-upward-rounded"
                  fontSize={28}
                />
              </motion.div>
              <div className="mt-5 flex rounded-full bg-white px-4 py-2 text-lg font-medium text-[#C18821] shadow-sm">
                วางการ์ดไว้ฝ่ายรัฐบาล
              </div>
            </motion.div>
          )}
        </div>

        <div
          id="opposition-board"
          className="relative flex size-full flex-col"
          onMouseUp={(e) => handleBoardDrop(e, "opposition")}
          onMouseEnter={() => handleMouseEnterBoard("opposition")}
          onMouseLeave={handleMouseLeaveBoard}
        >
          <div
            className="relative z-10 mb-[-1.5px] flex w-[56%] items-center justify-between rounded rounded-b-none border border-b-0 border-[#919090] bg-[#f8f8f8] px-3 py-2 transition-colors md:w-[36%]"
            style={{
              ...(hoverBoard === "opposition" && {
                backgroundColor: "#eaeaea",
              }),
            }}
          >
            <h3 className="text-base font-bold text-[#919090] md:text-2xl">
              ฝ่ายค้าน
            </h3>
            <span className="rounded bg-[#919090] px-3 py-1 text-white">
              <span className="text-base font-bold md:text-2xl">
                {oppositionCount}
              </span>{" "}
              ที่นั่ง
            </span>
          </div>

          <div className="absolute flex size-full items-start justify-end pr-5 md:justify-center md:pr-0">
            <button
              onClick={onSwapFormation}
              className="flex items-center gap-[6px] rounded bg-[var(--primary)] px-2 py-1 text-base font-medium text-white md:px-3 md:py-2 md:text-xl"
            >
              <Icon
                icon="material-symbols:swap-vert"
                className="text-base md:text-[28px]"
              />
              สลับฝ่าย
            </button>
          </div>

          <div
            className={
              "z-[1] grid h-full grid-cols-10 gap-2 rounded rounded-tl-none border border-[#919090] bg-[#f8f8f8] p-3 transition-colors xl:grid-cols-7 xl:grid-rows-2"
            }
            style={{
              ...(hoverBoard === "opposition" && {
                backgroundColor: "#eaeaea",
              }),
              ...(["xl", "2xl"].includes(breakpoint ?? "") &&
                opposition.length > 14 && {
                  gridTemplateColumns: `repeat(${Math.ceil(opposition.length / 2)}, 1fr)`,
                }),
              ...(breakpoint === "lg" &&
                opposition.length > 10 && {
                  gridTemplateColumns: `repeat(${opposition.length}, 1fr)`,
                }),
            }}
          >
            {dataSource.opposition.map((party) => (
              <FormationPartyCard
                key={party.id}
                party={party}
                board="opposition"
                handleDragStart={handleDragStart}
                isDragging={dragging?.id === party.id}
              />
            ))}
          </div>

          {sourceBoard && sourceBoard !== "opposition" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-1/2 z-[5] -translate-x-1/2 text-center"
            >
              <motion.div
                animate={
                  hoverBoard === "opposition"
                    ? { y: [0, -10, 0] }
                    : { y: [0, 0, 0] }
                }
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                className="mx-auto flex size-16 items-center justify-center rounded-full bg-white text-lg font-medium text-[#919090] shadow-sm"
              >
                <Icon
                  icon="material-symbols:arrow-upward-rounded"
                  fontSize={28}
                />
              </motion.div>
              <div className="mt-5 flex rounded-full bg-white px-4 py-2 text-lg font-medium text-[#919090] shadow-sm">
                วางการ์ดไว้ฝ่ายค้าน
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div
        id="other-board"
        className="flex h-full flex-col bg-gray-200 p-3 md:overflow-y-auto xl:h-screen xl:p-0 xl:pt-4"
        onMouseUp={(e) => handleBoardDrop(e, "other")}
        onMouseEnter={() => handleMouseEnterBoard("other")}
        onMouseLeave={handleMouseLeaveBoard}
      >
        <h3 className="px-1 text-base font-medium lg:text-lg xl:text-center">
          ยังไม่เลือกฝ่าย
        </h3>

        <div className="flex size-full gap-3 pt-2 xl:flex-col xl:px-3 xl:pt-4">
          {dataSource.other.map((party) => (
            <FormationPartyCard
              key={party.id}
              party={party}
              board="other"
              className="w-[50px] lg:w-[72px] xl:w-full"
              handleDragStart={handleDragStart}
              isDragging={dragging?.id === party.id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
