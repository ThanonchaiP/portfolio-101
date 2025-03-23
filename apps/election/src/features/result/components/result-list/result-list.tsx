"use client";

import { Loading } from "@/components/loading";
import { useGetPartyCount } from "@/features/geo";

import { ResultListItem } from "./result-list-item";

export const ResultList = () => {
  const { data, isPending } = useGetPartyCount({ regionId: "geo" });

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      <div className="flex w-full flex-col">
        <div
          style={{
            clipPath:
              "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%)",
          }}
        >
          <div className="flex bg-black py-1 pl-[24px] pr-[16px]">
            <div className="flex max-w-full flex-1 items-center text-lg text-white">
              จำนวนที่นั่งล่าสุด
            </div>
            <div className="ml-3 w-[120px] text-right text-sm text-white">
              เขต/บช.รายชื่อ
              <br />
              (ที่นั่ง)
            </div>
            <div className="ml-3 w-[120px] text-right text-sm text-white">
              ทั้งหมด
              <br />
              (ที่นั่ง)
            </div>
          </div>
        </div>

        <div className="custom-scrollbar relative flex-1 overflow-auto bg-white">
          {isPending ? (
            <Loading />
          ) : (
            data?.map((party, index) => (
              <ResultListItem
                key={party.id}
                party={party}
                number={index + 1}
                isWinner={index === 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
