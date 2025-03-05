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
import { formatNumberWithCommas } from "@/utils";

import { RegionVote } from "../../types";

type GeoRegionMapProps = {
  region: string;
  data?: RegionVote;
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

export const GeoRegionMap = ({ region, data }: GeoRegionMapProps) => {
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

    const onClick = (id: string) => {
      document.querySelectorAll("svg g g").forEach((e) => {
        if (
          e.id === id ||
          e.id.includes(`area-${id.split("-")[1]}`) ||
          e.id === `province-${id.slice(5, 7)}-name`
        ) {
          e.setAttribute("opacity", "1");
        } else {
          e.setAttribute("opacity", "0.3");
        }
      });
    };

    const regionElement = document.getElementById("region-wrapper");

    regionElement?.querySelectorAll("svg g g").forEach((e) => {
      e.addEventListener("mouseenter", () => {
        e.setAttribute("cursor", "pointer");
        if (e.id.includes("name")) return;

        const { x, y } = e.getBoundingClientRect();
        setTooltip({
          show: true,
          x: x + 30,
          y,
          areaId: e.id.split("-")[1],
        });
      });
      e.addEventListener("click", () => onClick(e.id));
      e.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      regionElement?.querySelectorAll("svg g g").forEach((e) => {
        e.removeEventListener("mouseenter", () => console.log("remove"));
        e.removeEventListener("mouseleave", handleMouseLeave);
        e.removeEventListener("click", () => console.log("remove"));
      });
    };
  }, [data, width]);

  return (
    <div
      id="region-wrapper"
      className="relative flex size-full max-h-full items-center justify-center"
    >
      {regionComponents[region] ?? <Fallback />}

      {true && (
        <div
          className="fixed z-10 min-w-[280px] rounded-[4px] bg-white shadow-md"
          style={{ top: tootltip.y, left: tootltip.x }}
        >
          <div className="bg-orange-50 px-2 py-1">
            <p className="text-sm font-bold text-[var(--primary)]">
              {data?.votes?.[tootltip.areaId]?.[0].district.name_th}
            </p>
          </div>

          <div className="flex items-center justify-between px-3 py-2">
            <div>ad</div>
            <h4 className={"text-[21px] font-bold text-gray-400"}>
              {formatNumberWithCommas(
                data?.votes?.[tootltip.areaId]?.[0].vote_count ?? 0,
              )}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
