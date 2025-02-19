import { use } from "react";

import { GeoRegionMap } from "@/features/geo";

type RegionPageProps = {
  params: Promise<{ region: string }>;
};

export default function RegionPage({ params }: RegionPageProps) {
  const { region } = use(params);

  return (
    <>
      <div className="flex-1">
        <GeoRegionMap region={region} />
      </div>
      <div className="h-full w-[360px]">{region}</div>
    </>
  );
}
