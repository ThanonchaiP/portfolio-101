import Image from "next/image";

import { PartyCount } from "@/types";

export const GeoPartyCountItem = (props: PartyCount) => {
  const { name, count, image } = props;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          alt="party-image"
          src={image}
          width={30}
          height={18}
          className="size-auto"
        />
        <h3 className="max-w-[120px] truncate">{name}</h3>
      </div>
      <h3 className="pt-px text-sm text-[var(--primary)]">
        <span className="text-[21px] font-bold">{count}</span> ที่นั่ง
      </h3>
    </div>
  );
};
