import Image from "next/image";
import { memo } from "react";

import { cn } from "@/lib/utils";
import { PartyCount } from "@/types";

import { Board } from "../../types";

type FormationPartyCardProps = {
  party: PartyCount;
  board: Board;
  isDragging?: boolean;
  handleDragStart?: (
    e: React.MouseEvent,
    party: PartyCount,
    board: Board,
  ) => void;
};

const FormationPartyCardElement = ({
  party,
  board,
  isDragging,
  handleDragStart,
}: FormationPartyCardProps) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart?.(e, party, board);
  };

  return (
    <div
      id={`party-${party.id}`}
      className={cn("h-fit cursor-grab touch-none", isDragging && "opacity-60")}
      onMouseDown={handleMouseDown}
    >
      <div className="pointer-events-none relative h-0 w-full select-none pt-[125%]">
        <div className="absolute left-0 top-0 flex size-full flex-col items-center overflow-hidden rounded border border-[#919090] bg-[#CCCACA]">
          <h3 className="mt-1 w-full truncate text-center">{party.name_en}</h3>

          <PartyLogo image={party.image} />
          <CandidateImage image={party.candidate_img} />
          <SeatCounter count={party.count} />
        </div>
      </div>
    </div>
  );
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
    <p>ที่นั่ง</p>
  </div>
);

export const FormationPartyCard = memo(FormationPartyCardElement);
