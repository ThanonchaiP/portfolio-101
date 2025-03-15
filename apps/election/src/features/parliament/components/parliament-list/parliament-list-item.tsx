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
    <h3 className="h-[30px] text-[26px] font-bold">{value}</h3>
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
      {/* ลำดับหมายเลข */}
      <h1
        className={cn(
          "min-w-[26px] text-center text-[26px] font-bold",
          isWinner && "text-[32px]",
        )}
      >
        {number}
      </h1>

      {/* โลโก้ + ชื่อพรรค */}
      <div className="ml-3 flex flex-1 items-center gap-3">
        <div
          className={cn("min-w-[76px] rounded p-[6px]", isWinner && "bg-white")}
        >
          <Image
            alt="party-image"
            src={party.image}
            width={60}
            height={28}
            className="size-auto"
          />
        </div>
        <h3
          className={cn(
            "text-lg font-medium text-gray-600",
            isWinner && "text-2xl font-bold text-white",
          )}
        >
          {party.name_en}
        </h3>
      </div>

      {/* ข้อมูลจำนวนที่นั่ง */}
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

      {/* จำนวนที่นั่งทั้งหมด */}
      <div className="ml-3 flex w-[10vmin] flex-col items-end">
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
