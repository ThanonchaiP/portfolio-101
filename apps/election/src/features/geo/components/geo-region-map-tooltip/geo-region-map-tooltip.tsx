import Image from "next/image";

import { formatNumberWithCommas } from "@/utils";

import { RegionVote } from "../../types";

type GeoRegionMapTooltipProps = {
  x: number;
  y: number;
  areaId: string;
  data?: RegionVote;
};

export const GeoRegionMapTooltip = (props: GeoRegionMapTooltipProps) => {
  const { x, y, areaId, data } = props;

  const voteWinner = data?.votes?.[areaId]?.[0];

  if (!voteWinner) return null;

  const candidate = voteWinner.candidate;
  const districtName = voteWinner.district.name_th;

  return (
    <div
      className="fixed z-10 min-w-[280px] rounded-[4px] bg-white shadow-md"
      style={{ top: y, left: x }}
    >
      <div className="bg-orange-50 px-2 py-1">
        <p className="text-sm font-bold text-[var(--primary)]">
          {districtName}
        </p>
      </div>

      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <Image alt="party-image" src="/gaara-sm.png" width={28} height={28} />
          <div
            style={{ backgroundColor: candidate.party.color }}
            className="ml-1 w-[30px]"
          >
            <Image
              alt="candidate-image"
              src="/gaara-sm.png"
              width={28}
              height={28}
            />
          </div>
          <p>{candidate?.name_en}</p>
        </div>
        <h4 className={"text-[20px] font-bold text-gray-400"}>
          {formatNumberWithCommas(voteWinner.vote_count)}
        </h4>
      </div>
    </div>
  );
};
