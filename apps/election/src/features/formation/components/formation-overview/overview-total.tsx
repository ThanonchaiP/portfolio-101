import { Icon } from "@iconify/react";

import { useFormationStore } from "../../store";

export const OverviewTotal = () => {
  const dataSource = useFormationStore((state) => state.dataSource);

  const governmentSeats = dataSource.government.reduce(
    (acc, party) => acc + party.count,
    0,
  );

  return (
    <>
      <div className="hidden max-w-[200px] items-center justify-between rounded border border-[#c18821] px-2 py-1 text-[#c18821] xl:mx-auto xl:flex xl:w-[200px]">
        <span className="font-medium">รวมทั้งหมด</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{governmentSeats}</span>
          <span>ที่นั่ง</span>
        </div>
      </div>

      <button className="flex max-h-[45px] items-center justify-center gap-1 rounded bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white hover:brightness-90 md:text-base xl:mx-auto xl:mt-2 xl:text-xl">
        <Icon icon="material-symbols:handshake" />
        จับขั้วเลย
      </button>
    </>
  );
};
