import Image from "next/image";

import { cn } from "@/lib/utils";
import { PartyCount } from "@/types";

type ResultListItemProps = {
  party: PartyCount;
  number: number;
  isWinner: boolean;
};

export const ResultListItem = ({
  party,
  isWinner,
  number,
}: ResultListItemProps) => {
  return (
    <div
      className="flex cursor-pointer items-center border-b border-gray-200 bg-white py-4 pl-6 pr-3 transition-colors hover:bg-gray-100"
      style={{ backgroundColor: isWinner ? party.color : "" }}
    >
      <div className="flex max-w-full flex-1 items-center gap-4 text-lg">
        <div className="relative h-[27px] min-w-[64px]">
          <Image
            alt="party-image"
            src={party.image}
            width={60}
            height={28}
            className="size-auto"
          />
          <span className="absolute bottom-[-9px] left-[-9px] flex size-[20px] items-center justify-center rounded-sm bg-white font-bold shadow-md">
            {number}
          </span>
        </div>
        <h3
          className={cn(
            "font-medium text-gray-600",
            isWinner && "text-2xl font-bold text-white",
          )}
        >
          {party.name_en}
        </h3>
      </div>
      <div className="ml-3 w-[120px] text-right">
        <h3
          className={cn(
            "text-[26px] font-bold text-gray-400",
            isWinner && "text-white",
          )}
        >
          {Math.floor(party.count / 2)} / {Math.ceil(party.count / 2)}
        </h3>
      </div>
      <div className="ml-3 flex w-[120px] justify-end">
        <h3
          className={cn(
            "w-fit rounded px-2 py-[6px] text-[26px] font-bold text-gray-700",
            isWinner && "bg-white",
          )}
        >
          {party.count}
        </h3>
      </div>
    </div>
  );
};
