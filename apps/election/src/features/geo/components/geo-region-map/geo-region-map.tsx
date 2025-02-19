import { JSX } from "react";

import {
  Bangkok,
  Central,
  Country,
  Eastern,
  North,
  Northeastern,
  Southern,
} from "@/data/region";

type GeoRegionMapProps = {
  region: string;
};

const regionComponents: Record<string, JSX.Element> = {
  geo: <Country />,
  "7": <Bangkok />,
  "2": <Central />,
  "5": <Eastern />,
  "3": <Northeastern />,
  "1": <North />,
  "6": <Southern />,
};

const Fallback = () => <div>Region not found</div>;

export const GeoRegionMap = ({ region }: GeoRegionMapProps) => (
  <div className="flex size-full max-h-full items-center justify-center">
    {regionComponents[region] ?? <Fallback />}
  </div>
);
