import Link from "next/link";

import { cn } from "@/lib/utils";

type GeoRegionMenuItemProps = {
  alias: string;
  active: boolean;
  href: string;
  constituency: number;
};

export const GeoRegionMenuItem = ({
  href,
  alias,
  active,
  constituency,
}: GeoRegionMenuItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-[210px] items-center justify-between gap-[6px] rounded-[4px] border border-[#EEC3AC] bg-[#FAF2EC] px-3 py-[10px] hover:border-[#DA634B] hover:bg-[#FBFBFB] hover:bg-[]",
        active && "border-[var(--primary)] bg-[#FBFBFB]",
      )}
    >
      <div>{alias}</div>
      <div>({constituency} เขต)</div>
    </Link>
  );
};
