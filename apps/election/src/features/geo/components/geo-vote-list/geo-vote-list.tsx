import { RegionVote } from "../../types";

import { GeoVoteItem } from "./geo-vote-item";
import { GeoVoteSkeleton } from "./geo-vote-skeleton";

type GeoVoteListProps = {
  data?: RegionVote;
  isLoading?: boolean;
};

export const GeoVoteList = ({ data, isLoading }: GeoVoteListProps) => {
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
        {isLoading ? (
          <GeoVoteSkeleton />
        ) : (
          <>
            {Object.values(data?.votes ?? []).map((vote, index) => (
              <GeoVoteItem key={index} vote={vote} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
