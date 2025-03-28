import Image from "next/image";

import { cn } from "@/lib/utils";
import { PartyCount } from "@/types";
import { formatNumberWithCommas } from "@/utils";

type ParliamentListItemProps = {
  party: PartyCount;
  number: number;
  isWinner: boolean;
};

const InfoBlock = ({
  value,
  subValue,
  isWinner,
}: {
  value: number;
  subValue: number;
  isWinner: boolean;
}) => (
  <div
    className={cn(
      "ml-3 flex w-[10vmin] flex-col items-end text-gray-400",
      isWinner && "text-white",
    )}
  >
    <h3 className="h-[30px] text-xl font-bold md:text-[26px]">{value}</h3>
    <h3 className="text-[15px] font-medium">
      {formatNumberWithCommas(subValue)}
    </h3>
  </div>
);

export const ParliamentListItem = ({
  party,
  number,
  isWinner,
}: ParliamentListItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center border-b border-gray-200 px-3 py-4 transition-colors hover:bg-gray-100",
        isWinner ? "text-white" : "bg-[#FFFBF8]",
      )}
      style={{ backgroundColor: isWinner ? party.color : "" }}
    >
      <h1
        className={cn(
          "hidden min-w-[26px] text-center text-xl font-bold md:block md:text-[26px]",
          isWinner && "text-2xl md:text-[32px]",
        )}
      >
        {number}
      </h1>

      <div className="flex flex-1 items-center gap-3 md:ml-3">
        <div
          className={cn(
            "relative max-w-[46px] rounded p-[6px] md:min-w-[76px] md:max-w-none",
            isWinner && "bg-white",
          )}
        >
          <Image
            alt="party-image"
            src={party.image}
            width={60}
            height={28}
            className="size-auto"
          />

          <span className="absolute bottom-[-9px] left-[-4px] flex size-[18px] items-center justify-center rounded-sm bg-white font-bold text-gray-700 shadow-md">
            {number}
          </span>
        </div>
        <h3
          className={cn(
            "text-base font-medium text-gray-600 md:text-lg",
            isWinner && "text-lg font-bold text-white md:text-2xl",
          )}
        >
          {party.name_en}
          <div className="block md:hidden">รวม {party.count} ที่นั่ง</div>
        </h3>
      </div>

      <InfoBlock
        value={Math.floor(party.count / 2)}
        subValue={(party.count / 2) * 900}
        isWinner={isWinner}
      />
      <InfoBlock
        value={Math.floor(party.count / 2)}
        subValue={(party.count / 2) * 700}
        isWinner={isWinner}
      />

      <div className="ml-3 hidden w-[10vmin] flex-col items-end md:flex">
        <div
          className={cn(
            "rounded text-black",
            isWinner && "bg-white px-2 py-[6px]",
          )}
          style={{ color: isWinner ? party.color : "" }}
        >
          <h3 className="text-[26px] font-bold">{party.count}</h3>
        </div>
      </div>
    </div>
  );
};
