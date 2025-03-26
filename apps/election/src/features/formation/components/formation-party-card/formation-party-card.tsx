import Image from "next/image";
import { memo } from "react";

import { cn } from "@/lib/utils";
import { PartyCount } from "@/types";

import { Board } from "../../types";

type FormationPartyCardProps = {
  party: PartyCount;
  board: Board;
  isDragging?: boolean;
  className?: string;
  handleDragStart?: (
    e: React.MouseEvent,
    party: PartyCount,
    board: Board,
  ) => void;
};

const getBackgroundAndBorder = (board: Board) => {
  const background =
    board === "government"
      ? "linear-gradient(169.31deg, rgb(213, 153, 47) 25.18%, rgb(225, 196, 128) 93.97%)"
      : board === "opposition"
        ? "linear-gradient(169.31deg, rgb(217, 217, 217) 25.18%, rgb(255, 255, 255) 93.97%)"
        : "rgb(204, 202, 202)";

  const borderColor =
    board === "government"
      ? "#C18821"
      : board === "opposition"
        ? "rgb(145, 144, 144)"
        : "rgb(145, 144, 144)";

  return { background, borderColor };
};

const PartyLogo = ({ image }: { image: string }) => (
  <div className="absolute inset-x-[3%] bottom-[3%] z-[1] pt-[120%]">
    <Image
      alt="party logo"
      src={image}
      width={67}
      height={63}
      className="absolute inset-0 size-full object-contain opacity-60"
    />
  </div>
);

const CandidateImage = ({ image }: { image: string }) => (
  <div className="absolute inset-x-[10%] bottom-[2%] z-[2] max-h-[190px] pt-[94%]">
    <Image
      alt="candidate image"
      src={image}
      width={200}
      height={120}
      className="absolute inset-0 size-full object-contain"
    />
  </div>
);

const SeatCounter = ({ count }: { count: number }) => (
  <div className="absolute bottom-0 left-0 z-[3] flex h-1/5 w-full items-center justify-center gap-1 bg-black text-white">
    <p>{count}</p>
    <p className="hidden md:inline-block">ที่นั่ง</p>
  </div>
);

const FormationPartyCardElement = ({
  party,
  board,
  className,
  isDragging,
  handleDragStart,
}: FormationPartyCardProps) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart?.(e, party, board);
  };

  const { background, borderColor } = getBackgroundAndBorder(board);

  return (
    <div
      id={`party-${party.id}`}
      className={cn(
        "h-fit cursor-grab touch-none",
        isDragging && "opacity-60",
        className && className,
      )}
      onMouseDown={handleMouseDown}
    >
      <div className="pointer-events-none relative h-0 w-full select-none pt-[125%]">
        <div
          style={{ background, borderColor }}
          className="absolute left-0 top-0 flex size-full flex-col items-center overflow-hidden rounded border"
        >
          <h3
            className={cn(
              "mt-1 w-full truncate text-center",
              board === "government" ? "text-white" : "text-gray-800",
            )}
          >
            {party.name_en}
          </h3>
          <PartyLogo image={party.image} />
          <CandidateImage image={party.candidate_img} />
          <SeatCounter count={party.count} />
        </div>
      </div>
    </div>
  );
};

export const FormationPartyCard = memo(FormationPartyCardElement);
