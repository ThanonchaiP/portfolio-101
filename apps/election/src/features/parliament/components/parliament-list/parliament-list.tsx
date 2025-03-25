import { Loading } from "@/components/loading";
import { useGetPartyCount } from "@/features/geo";

import { ParliamentListItem } from "./parliament-list-item";

export const ParliamentList = () => {
  const { data, isPending } = useGetPartyCount({ regionId: "geo" });

  return (
    <div className="flex h-full overflow-hidden lg:max-h-[80vh] xl:max-h-none">
      <div className="flex w-full flex-col">
        <div
          className="border-b border-gray-200"
          style={{
            clipPath:
              "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%)",
          }}
        >
          <div className="flex bg-white py-1 pl-[24px] pr-[16px]">
            <div className="flex max-w-full flex-1 items-center text-lg"></div>
            <div className="ml-3 w-[10vmin] text-right text-sm">
              เขต
              <br />
              (ที่นั่ง)
            </div>
            <div className="ml-3 w-[10vmin] text-right text-sm">
              บัญชีรายชื่อ
              <br />
              (ที่นั่ง)
            </div>
            <div className="ml-3 hidden w-[10vmin] text-right text-sm md:block">
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
              <ParliamentListItem
                party={party}
                key={party.id}
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
