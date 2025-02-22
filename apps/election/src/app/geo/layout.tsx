import { Title } from "@/components/title";
import { GeoRegionMenu } from "@/features/geo";

export default function GeoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full gap-4">
      <div className="flex flex-col gap-6">
        <Title label="ผลคะแนนรายเขต" />
        <GeoRegionMenu />
      </div>
      {children}
    </div>
  );
}
