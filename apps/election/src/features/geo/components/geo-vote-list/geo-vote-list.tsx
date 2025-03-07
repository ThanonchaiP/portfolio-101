import Image from "next/image";

import { cn } from "@/lib/utils";
import { formatNumberWithCommas } from "@/utils";

import { RegionVote } from "../../types";

type GeoVoteListProps = {
  data?: RegionVote;
  isLoading?: boolean;
};

export const GeoVoteList = ({ data }: GeoVoteListProps) => {
  return (
    <div className="flex max-h-full flex-col">
      <div className="bg-[#E5E4E3] p-[10px]">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="ค้นหาจากชื่อจังหวัด/เขต"
            className="w-full border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <svg
            className="absolute right-3 top-2.5 size-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 1 0-12 0 6 6 0 0 0 12 0z"
            ></path>
          </svg>
        </div>
      </div>

      <h3 className="min-h-[24px] text-[var(--primary)]">
        {data && `${data?.name_th} (${data?.constituency})`}
      </h3>
      <div className="custom-scrollbar h-full max-h-full overflow-y-auto">
        {data &&
          Object.values(data.votes).map((vote, index) => (
            <div
              key={index}
              className="cursor-pointer border-b border-gray-300 bg-white pb-2 pl-[14px] pr-2 pt-4 transition-colors hover:bg-[#FAF2EC]"
            >
              <div className="flex items-center justify-between text-[var(--primary)]">
                <h3>{vote[0].district.name_th}</h3>
                <h3 className="text-sm">
                  ห่างกัน
                  <strong className="ml-1">
                    {vote[0].vote_count - vote[1].vote_count}
                  </strong>
                </h3>
              </div>
              <div className="mt-2 flex flex-col">
                {vote.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
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
          ))}
      </div>
    </div>
  );
};
