import Image from "next/image";

import { useGetPartyCount } from "@/features/geo";
import { cn } from "@/lib/utils";

export const ResultList = () => {
  const { data } = useGetPartyCount({ regionId: "geo" });

  return (
    <div className="flex h-full flex-1">
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

        <div className="custom-scrollbar flex-1 overflow-auto">
          {data?.map((party, index) => (
            <div
              key={party.id}
              className="flex items-center bg-white py-4 pl-6 pr-3"
              style={{ backgroundColor: index === 0 ? party.color : "" }}
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
                  <span className="absolute bottom-[-9px] left-[-9px] flex size-[20px] items-center justify-center rounded-sm bg-white shadow-md">
                    {index + 1}
                  </span>
                </div>
                <h3
                  className={cn(
                    "text-gray-700",
                    index === 0 && "text-2xl font-bold text-white",
                  )}
                >
                  {party.name_en}
                </h3>
              </div>
              <div className="ml-3 w-[120px] text-right">
                <h3
                  className={cn(
                    "text-[26px] font-bold text-gray-400",
                    index === 0 && "text-white",
                  )}
                >
                  {Math.floor(party.count / 2)} / {Math.ceil(party.count / 2)}
                </h3>
              </div>
              <div className="ml-3 flex w-[120px] justify-end">
                <h3
                  className={cn(
                    "w-fit rounded px-2 py-[6px] text-[26px] font-bold text-gray-700",
                    index === 0 && "bg-white",
                  )}
                >
                  {party.count}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
