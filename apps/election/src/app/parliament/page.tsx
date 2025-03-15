"use client";

import { Title } from "@/components/title";
import { ParliamentList, ParliamentSeat } from "@/features/parliament";

export default function ParliamentPage() {
  return (
    <div
      className="grid h-full flex-1 gap-10 pl-10"
      style={{
        gap: "4%",
        gridTemplateColumns: "minmax(0px, 1fr) max(60vmin, 540px)",
      }}
    >
      <div className="flex w-full flex-col pb-[80px]">
        <Title label="ผลคะแนน ส.ส. รายพรรค" />
        <ParliamentSeat />
      </div>

      <ParliamentList />
    </div>
  );
}
