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

  const candidate = voteWinner?.candidate;
  const districtName = voteWinner?.district.name_th;

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
        <div>{candidate?.name_en}</div>
        <h4 className={"text-[20px] font-bold text-gray-400"}>
          {formatNumberWithCommas(data?.votes?.[areaId]?.[0].vote_count ?? 0)}
        </h4>
      </div>
    </div>
  );
};
