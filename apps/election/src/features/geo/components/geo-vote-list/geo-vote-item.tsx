import Image from "next/image";

import { cn } from "@/lib/utils";
import { formatNumberWithCommas } from "@/utils";

import { RegionVoteValue } from "../../types";

type GeoVoteItemProps = {
  vote: RegionVoteValue[];
};

export const GeoVoteItem = ({ vote }: GeoVoteItemProps) => {
  return (
    <div className="cursor-pointer border-b border-gray-300 bg-white pb-2 pl-[14px] pr-2 pt-4 transition-colors hover:bg-[#FAF2EC]">
      <div className="flex items-center justify-between text-[var(--primary)]">
        <h3>{vote[0].district?.name_th}</h3>
        <h3 className="pt-1 text-sm">
          ห่างกัน
          <strong className="ml-1">
            {vote[0].vote_count - vote[1].vote_count}
          </strong>
        </h3>
      </div>
      <div className="mt-2 flex flex-col">
        {vote.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h4 className="min-w-[10px] text-lg font-semibold text-gray-700">
                {index + 1}
              </h4>
              <Image
                alt="party-image"
                src={item.candidate.party.image}
                width={60}
                height={28}
                className="size-auto"
              />
              <h4>{item.candidate.name_en}</h4>
            </div>
            <h4
              className={cn(
                "text-[21px] font-bold text-gray-700",
                index > 0 && "text-gray-400",
              )}
            >
              {formatNumberWithCommas(item.vote_count)}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
