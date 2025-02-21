import { GeoRegionMap, GeoSwitchData } from "@/features/geo";

export default function GeoPage() {
  return (
    <>
      <div className="relative flex flex-1">
        <GeoRegionMap region="geo" />
        <GeoSwitchData />
      </div>
      <div className="w-[360px]">Table</div>
    </>
  );
}
