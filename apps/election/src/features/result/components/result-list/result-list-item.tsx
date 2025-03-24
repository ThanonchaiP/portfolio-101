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
      className="flex cursor-pointer items-center border-b border-gray-200 bg-white py-2 pl-6 pr-3 transition-colors hover:bg-gray-100 lg:py-4"
      style={{ backgroundColor: isWinner ? party.color : "" }}
    >
      <div className="flex max-w-full flex-1 items-center gap-4 text-lg">
        <div className="relative min-w-[44px] max-w-[44px] md:min-w-[64px] md:max-w-[64px] xl:min-w-[74px] xl:max-w-none">
          <div className={cn("rounded p-[6px]", isWinner && "bg-white")}>
            <Image
              alt="party-image"
              src={party.image}
              width={60}
              height={28}
              className="size-auto"
            />
          </div>
          <span className="absolute bottom-[-9px] left-[-9px] flex size-[20px] items-center justify-center rounded-sm bg-white font-bold shadow-md">
            {number}
          </span>
        </div>
        <h3
          className={cn(
            "text-base font-medium text-gray-600 xl:text-lg",
            isWinner && "text-xl font-bold text-white xl:text-2xl",
          )}
        >
          {party.name_en}
        </h3>
      </div>
      <div className="ml-3 w-[100px] text-right md:w-[120px]">
        <h3
          className={cn(
            "text-xl font-bold text-gray-400 xl:text-[26px]",
            isWinner && "text-white",
          )}
        >
          {Math.floor(party.count / 2)} / {Math.ceil(party.count / 2)}
        </h3>
      </div>
      <div className="ml-3 flex w-[60px] justify-end md:w-[90px]">
        <h3
          className={cn(
            "w-fit rounded px-2 py-[6px] text-xl font-bold text-gray-700 xl:text-[26px]",
            isWinner && "bg-white",
          )}
        >
          {party.count}
        </h3>
      </div>
    </div>
  );
};
