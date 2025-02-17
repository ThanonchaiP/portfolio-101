"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { Title } from "@/components/title";

const cn = (...classes: (string | undefined)[]) => twMerge(clsx(classes));

export default function GeoPage() {
  const pathname = usePathname();

  const regions = [
    { id: 1, name: "ทั่วประเทศ", depth: 400, href: "/geo" },
    { id: 2, name: "กรุงเทพ ฯ", depth: 33, href: "/geo/regions/7" },
    { id: 3, name: "กลาง", depth: 75, href: "/geo/regions/2" },
    { id: 4, name: "ตะวันออก", depth: 29, href: "/geo/regions/5" },
    { id: 5, name: "อีสาน", depth: 133, href: "/geo/regions/3" },
    { id: 6, name: "เหนือ", depth: 70, href: "/geo/regions/1" },
    { id: 7, name: "ใต้", depth: 60, href: "/geo/regions/6" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Title label="ผลคะแนนรายเขต" />

      <div className="flex flex-col gap-[6px]">
        {regions.map((region) => (
          <Link
            href={`/geo/${region.id}`}
            key={region.id}
            className={cn(
              "flex w-[210px] items-center justify-between gap-[6px] rounded-[4px] border border-[#EEC3AC] bg-[#FAF2EC] px-3 py-[10px] hover:border-[#DA634B] hover:bg-[#FBFBFB]",
              pathname === region.href
                ? "border-[#DA634B] bg-[#FBFBFB]"
                : undefined,
            )}
          >
            <div>{region.name}</div>
            <div>({region.depth} เขต)</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
