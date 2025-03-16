import Image from "next/image";

import { PartyCount } from "@/types";

type ParliamentSeatTooltipProps = {
  x: number;
  y: number;
  show: boolean;
  partyCount: PartyCount;
};

export const ParliamentSeatTooltip = ({
  x,
  y,
  show,
  partyCount,
}: ParliamentSeatTooltipProps) => {
  if (!show) return null;

  const { name_en, count, image } = partyCount;
  const countHalf = Math.floor(count / 2);

  return (
    <div
      className="fixed z-50 flex items-center gap-3 rounded bg-white p-3 text-sm shadow-md"
      style={{
        top: y,
        left: x,
        pointerEvents: "none", // ป้องกัน tooltip ไม่ให้บัง event อื่น
      }}
    >
      <Image alt="party-image" src={image} width={68} height={48} />
      <h3 className="text-lg font-medium">{name_en}</h3>
      <h3 className="ml-2 text-2xl font-medium text-gray-400">
        {countHalf}/{countHalf}
      </h3>
      <div className="ml-1 flex items-end gap-1">
        <h3 className="text-2xl font-medium">{count}</h3>
        <p className="mb-0 pb-[2px]">ที่นั่ง</p>
      </div>
    </div>
  );
};
