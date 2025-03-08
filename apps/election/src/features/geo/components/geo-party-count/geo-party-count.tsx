"use client";

import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";

import { useGetPartyCount } from "../../api/get-party-count";

import { GeoPartyCountItem } from "./geo-party-count-item";

export const GeoPartyCount = () => {
  const regionId = (useParams().region ?? "geo") as string;

  const parties = useGetPartyCount({ regionId }).data ?? [];

  return (
    <div className="mt-2">
      <h3 className="text-[21px]">ผลคะแนน</h3>
      <div className="mt-4 flex flex-col gap-2">
        {parties.slice(0, 5).map((party) => (
          <GeoPartyCountItem key={party.name} {...party} />
        ))}

        {parties.length > 5 && (
          <div className="flex items-center gap-2">
            <div className="mx-2 inline-block size-4 bg-slate-400" />
            <h3 className="cursor-pointer">
              พรรคอื่น ๆ (
              {parties
                .slice(5, parties.length)
                .reduce((acc, party) => acc + party.count, 0)}{" "}
              ที่นั่ง)
              <Icon
                icon="material-symbols:info"
                className="ml-1 inline-block pb-[2px] text-lg text-gray-500"
              />
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
