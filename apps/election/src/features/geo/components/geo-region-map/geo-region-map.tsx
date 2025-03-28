"use client";

import { JSX, useEffect, useState } from "react";

import { useWindowDimensions } from "@/app/hooks";
import {
  Bangkok,
  Central,
  Country,
  Eastern,
  North,
  Northeastern,
  Southern,
} from "@/data/region";
import { cn } from "@/lib/utils";

import { RegionVote } from "../../types";
import { GeoRegionMapTooltip } from "../geo-region-map-tooltip";

type GeoRegionMapProps = {
  region: string;
  data?: RegionVote;
  className?: string;
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

export const GeoRegionMap = ({
  region,
  data,
  className,
}: GeoRegionMapProps) => {
  const { width } = useWindowDimensions();

  const [tootltip, setTooltip] = useState({
    x: 0,
    y: 0,
    areaId: "",
    show: false,
  });

  useEffect(() => {
    if (!data) return;
    const handleMouseLeave = () => {
      setTooltip((prev) => ({ ...prev, show: false }));
    };

    // const onClick = (id: string) => {
    //   document.querySelectorAll("svg g g").forEach((e) => {
    //     if (
    //       e.id === id ||
    //       e.id.includes(`area-${id.split("-")[1]}`) ||
    //       e.id === `province-${id.slice(5, 7)}-name`
    //     ) {
    //       e.setAttribute("opacity", "1");
    //     } else {
    //       e.setAttribute("opacity", "0.3");
    //     }
    //   });
    // };

    const regionElement = document.getElementById("region-wrapper");

    regionElement?.querySelectorAll("svg g g").forEach((e) => {
      //set color for each area
      const areaId = e.id.split("-")[1];
      const areaColor = data?.votes?.[areaId]?.[0].candidate.party.color;
      e.querySelector("rect")?.setAttribute("fill", areaColor ?? "#D9D9D9");

      e.addEventListener("mouseenter", () => {
        e.setAttribute("cursor", "pointer");
        if (e.id.includes("name")) return;

        const { x, y } = e.getBoundingClientRect();
        setTooltip({
          y,
          areaId,
          x: x + 40,
          show: true,
        });
      });
      // e.addEventListener("click", () => onClick(e.id));
      e.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      regionElement?.querySelectorAll("svg g g").forEach((e) => {
        e.removeEventListener("mouseenter", () => console.log("remove"));
        e.removeEventListener("mouseleave", handleMouseLeave);
        // e.removeEventListener("click", () => console.log("remove"));
      });
    };
  }, [data, width]);

  return (
    <div
      id="region-wrapper"
      className={cn(
        "relative flex size-full max-h-full items-center justify-center",
        className && className,
      )}
    >
      {regionComponents[region] ?? <Fallback />}

      {tootltip.show && <GeoRegionMapTooltip data={data} {...tootltip} />}
    </div>
  );
};
