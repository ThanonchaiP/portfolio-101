"use client";

import { Title } from "@/components/title";
import { ParliamentSeat } from "@/features/parliament";

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
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sit
        officia possimus molestias aspernatur. Repellat voluptatibus quia
        repellendus quod ab, a tempore? Minus consequatur molestiae assumenda
        quos aliquid libero? Rem!
      </h3>
    </div>
  );
}
