"use client";

import { Icon } from "@iconify/react";

import { Logo } from "../logo";
import { Menu } from "../menu";

export const Sidebar = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-1 bg-[#fff5ee] pt-2 lg:flex-row lg:items-start lg:gap-0 lg:bg-transparent lg:pt-0 xl:flex-col">
      <Logo />
      <Menu />

      <div className="fixed bottom-4 right-4 z-10 flex flex-col rounded bg-white p-3 shadow xl:static xl:z-0 xl:rounded-none xl:bg-transparent xl:p-0 xl:shadow-none">
        <div className="flex items-center gap-1 xl:mb-2">
          <h3>จำนวนหน่วยที่นับแล้ว</h3>
          <Icon icon="material-symbols:info-outline" />
        </div>

        <div>
          <h3 className="font-bold text-[var(--primary)] xl:text-[39px]">
            100<span className="xl:text-lg">%</span>
          </h3>
          <span className="hidden h-3 w-full bg-[var(--primary)] xl:block" />
          <div className="mt-2 flex items-center gap-2 text-xs">
            <Icon icon="material-symbols:nest-clock-farsight-analog-outline" />
            <p>อัปเดตล่าสุด ณ วันที่ 27 พ.ค. 66 14:10 น.</p>
          </div>
        </div>

        <div
          className="mt-5 hidden bg-white px-4 py-1 text-sm xl:block"
          style={{
            clipPath:
              "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%)",
          }}
        >
          คะแนนจาก กกต. อย่างเป็นทางการ
        </div>
      </div>
    </div>
  );
};
