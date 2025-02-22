"use client";

import { usePathname } from "next/navigation";

import regions from "@/data/regions.json";

import { GeoRegionMenuItem } from "../geo-region-menu-item";

export const GeoRegionMenu = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-[6px]">
      <GeoRegionMenuItem
        alias="ทั่วประเทศ"
        constituency={400}
        active={pathname === "/geo"}
        href="/geo"
      />
      {regions.map((region) => (
        <GeoRegionMenuItem
          key={region.id}
          href={`/geo/regions/${region.id}`}
          active={pathname.endsWith(region.id)}
          {...region}
        />
      ))}
    </div>
  );
};
