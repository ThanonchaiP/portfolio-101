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
        "flex flex-shrink-0 items-center justify-between gap-[6px] rounded-[4px] border border-[#EEC3AC] bg-[#FAF2EC] px-2 py-[10px] text-sm hover:border-[#DA634B] hover:bg-[#FBFBFB] hover:bg-[] hover:text-[var(--primary)] xl:w-[210px] xl:px-3 xl:text-base",
        active && "border-[var(--primary)] bg-[#FBFBFB] text-[var(--primary)]",
      )}
    >
      <div>{alias}</div>
      <div>({constituency} เขต)</div>
    </Link>
  );
};
