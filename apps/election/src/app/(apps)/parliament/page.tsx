"use client";

import { Title } from "@/components/title";
import { ParliamentList, ParliamentSeat } from "@/features/parliament";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export default function ParliamentPage() {
  const breakpoints = useBreakpoint();

  return (
    <div
      className="grid h-full gap-10 xl:pl-10"
      style={{
        ...(!["sm", "md"].includes(breakpoints ?? "lg") && {
          gap: "4%",
          gridTemplateColumns: "minmax(0px, 1fr) max(60vmin, 540px)",
        }),
      }}
    >
      <div className="flex w-full flex-col gap-6 lg:gap-0 lg:pb-[80px]">
        <Title label="ผลคะแนน ส.ส. รายพรรค" />
        <ParliamentSeat />
      </div>

      <ParliamentList />
    </div>
  );
}
