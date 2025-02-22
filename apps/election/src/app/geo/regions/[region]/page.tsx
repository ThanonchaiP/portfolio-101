import { use } from "react";

import { GeoRegionMap, GeoSwitchData, GeoVoteList } from "@/features/geo";

type RegionPageProps = {
  params: Promise<{ region: string }>;
};

export default function RegionPage({ params }: RegionPageProps) {
  const { region } = use(params);

  return (
    <>
      <div className="relative flex-1">
        <GeoRegionMap region={region} />
        <GeoSwitchData />
      </div>
      <div className="h-full w-[360px]">
        <GeoVoteList />
      </div>
    </>
  );
}
