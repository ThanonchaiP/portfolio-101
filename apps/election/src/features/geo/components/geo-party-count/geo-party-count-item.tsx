import Image from "next/image";

import { cn } from "@/lib/utils";
import { PartyCount } from "@/types";

interface GeoPartyCountItemProps extends PartyCount {
  eclipse?: boolean;
}

export const GeoPartyCountItem = ({
  name,
  count,
  image,
  eclipse,
}: GeoPartyCountItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          alt={`${name} party logo`}
          src={image}
          width={30}
          height={18}
          className="size-auto"
        />
        <h3 className={cn(eclipse && "max-w-[120px] truncate")}>{name}</h3>
      </div>
      <h3 className="pt-px text-sm text-[var(--primary)]">
        <span className="text-[21px] font-bold">{count}</span> ที่นั่ง
      </h3>
    </div>
  );
};
