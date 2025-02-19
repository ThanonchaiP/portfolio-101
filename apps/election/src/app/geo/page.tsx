import { GeoRegionMap } from "@/features/geo";

export default function GeoPage() {
  return (
    <>
      <div className="flex flex-1">
        <GeoRegionMap region="geo" />
      </div>
      <div className="w-[360px]">Table</div>
    </>
  );
}
