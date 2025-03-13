import { Icon } from "@iconify/react/dist/iconify.js";

import { Modal } from "@/components/modal";
import { useToggle } from "@/hooks/use-toggle";
import { PartyCount } from "@/types";

import { Formation } from "../../types";

type CarouselSeatBarProps = {
  formation: Formation;
  partyCount: Record<string, PartyCount>;
};

export const CarouselSeatBar = ({
  formation,
  partyCount,
}: CarouselSeatBarProps) => {
  const [open, toggle] = useToggle();

  const totalSeats = formation?.governmentPartyRefCodes.reduce(
    (acc, partyRefCode) => {
      const partyCountObj = partyCount[partyRefCode];
      return acc + (partyCountObj?.count || 0);
    },
    0,
  );

  const moreParty = formation?.governmentPartyRefCodes.slice(10) ?? [];
  const morePartyCount = moreParty.reduce((acc, partyRefCode) => {
    const partyCountObj = partyCount[partyRefCode];
    return acc + (partyCountObj?.count || 0);
  }, 0);

  return (
    <div className="relative flex h-8 w-full items-center bg-white">
      <div
        className="absolute bottom-[50px] right-0 z-10 flex cursor-pointer items-center gap-2"
        onClick={toggle}
      >
        <div className="inline-block size-4 bg-slate-400" />
        <h3>
          พรรคอื่น ๆ {morePartyCount} ที่นั่ง
          <Icon
            icon="material-symbols:info"
            className="ml-1 inline-block pb-[2px] text-lg text-gray-500"
          />
        </h3>
      </div>

      <div className="absolute left-2 flex h-full gap-1 text-white">
        <p className="pt-[5px]">รวม</p>
        <p className="flex items-center pb-[3px] text-[26px] font-bold">
          {totalSeats}
        </p>
        <p className="pt-[5px]">ที่นั่ง</p>
      </div>

      <div className="flex size-full">
        {formation?.governmentPartyRefCodes
          .slice(0, 10)
          .map((partyRefCode, i) => {
            const partyCountObj = partyCount[partyRefCode];
            const count = partyCountObj?.count || 0;
            const width = (count / 400) * 100;

            return (
              <span
                key={i}
                className="h-full"
                style={{
                  width: `${width}%`,
                  backgroundColor: partyCountObj?.color,
                }}
              />
            );
          })}

        <span
          className="flex h-full w-1/3 items-center justify-center bg-slate-400"
          style={{
            width: `${(morePartyCount / 400) * 100}%`,
          }}
        />
      </div>

      <div className="absolute right-2 flex h-full gap-1 text-gray-300">
        <p className="flex items-center pb-[3px] text-[26px] font-bold">400</p>
        <p className="pt-[5px]">ที่นั่ง</p>
      </div>

      <div className="absolute left-1/2 top-0 border-l border-dashed border-black pt-10">
        <span className="ml-2">200 ที่นั่ง</span>
        <span className="ml-1 text-xs text-gray-600">(กึ่งหนึ่งของ ส.ส.)</span>
      </div>

      <Modal
        open={open}
        onClose={toggle}
        title={
          <h2 className="text-lg text-[var(--primary)]">
            พรรคอื่น ๆ ({morePartyCount} ที่นั่ง)
          </h2>
        }
      >
        {moreParty.map((partyRefCode) => {
          const partyCountObj = partyCount[partyRefCode];

          if (!partyCountObj) return null;

          return (
            <div key={partyRefCode} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="size-4"
                  style={{ backgroundColor: partyCountObj.color }}
                />
                <h3>{partyCountObj.name_en}</h3>
              </div>
              <h3 className="pt-px text-sm text-[var(--primary)]">
                <span className="text-[21px] font-bold">
                  {partyCountObj.count ?? 0}
                </span>{" "}
                ที่นั่ง
              </h3>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};
