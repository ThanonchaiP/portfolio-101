"use client";

import {
  GeoRegionMap,
  GeoSwitchData,
  GeoVoteList,
  useGetGeoVote,
} from "@/features/geo";

export default function GeoPage() {
  const { data, isPending } = useGetGeoVote();

  return (
    <>
      <div className="relative flex flex-1">
        <GeoRegionMap region="geo" data={data?.data} />
        <GeoSwitchData />
      </div>
      <div className="w-[360px]">
        <GeoVoteList data={data?.data} isLoading={isPending} />
      </div>
    </>
  );
}
