"use client";

import { Icon } from "@iconify/react";

import { Logo } from "../logo";
import { Menu } from "../menu";

export const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between">
      <Logo />
      <Menu />
      <div className="flex flex-col">
        <div className="mb-2 flex items-center gap-1">
          <h3>จำนวนหน่วยที่นับแล้ว</h3>
          <Icon icon="material-symbols:info-outline" />
        </div>

        <div>
          <h3 className="text-[39px] font-bold text-[var(--primary)]">
            100<span className="text-lg">%</span>
          </h3>
          <span className="block h-3 w-full bg-[var(--primary)]" />
          <div className="mt-2 flex items-center gap-2 text-xs">
            <Icon icon="material-symbols:nest-clock-farsight-analog-outline" />
            <p>อัปเดตล่าสุด ณ วันที่ 27 พ.ค. 66 14:10 น.</p>
          </div>
        </div>

        <div
          className="mt-5 bg-white px-4 py-1 text-sm"
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
