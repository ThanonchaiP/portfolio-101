import Image from "next/image";

import { cn } from "@/lib/utils";
import { PartyCount } from "@/types";

interface GeoPartyCountItemProps extends PartyCount {
  eclipse?: boolean;
}

export const GeoPartyCountItem = ({
  name_en,
  count,
  image,
  eclipse,
}: GeoPartyCountItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          alt={`${name_en} party logo`}
          src={image}
          // Unoptimized images (docs/adr/0003): pin the display size (source
          // file is 148x63) — without this the raw 148px file renders.
          width={32}
          height={14}
        />
        <h3 className={cn(eclipse && "max-w-[120px] truncate")}>{name_en}</h3>
      </div>
      <h3 className="pt-px text-sm text-[var(--primary)]">
        <span className="text-base font-bold md:text-[21px]">{count}</span>{" "}
        ที่นั่ง
      </h3>
    </div>
  );
};
