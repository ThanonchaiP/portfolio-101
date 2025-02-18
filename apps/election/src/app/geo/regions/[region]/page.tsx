import { use } from "react";

type RegionPageProps = {
  params: Promise<{ region: string }>;
};

export default function RegionPage({ params }: RegionPageProps) {
  const { region } = use(params);

  return (
    <>
      <div className="h-full flex-1">{region}</div>
      <div className="h-full flex-1">{region}</div>
    </>
  );
}
