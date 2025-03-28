import { Title } from "@/components/title";
import { GeoPartyCount, GeoRegionMenu } from "@/features/geo";

export default function GeoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-full grid-cols-1 gap-4 gap-y-12 pb-20 lg:grid-cols-[211px_1fr_350px] lg:pb-36 xl:gap-y-4 xl:pb-0">
      <div className="flex flex-col gap-6 lg:col-span-3 xl:col-span-1">
        <Title label="ผลคะแนนรายเขต" />
        <GeoRegionMenu />
        <GeoPartyCount className="hidden xl:block" />
      </div>
      {children}
    </div>
  );
}
