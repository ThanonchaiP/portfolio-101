import { useEffect, useState, useMemo } from "react";

import { useWindowDimensions } from "@/app/hooks";
import { PartySeat } from "@/data/party-seat";
import { useGetPartyCount } from "@/features/geo";
import { PartyCount } from "@/types";

import { ParliamentSeatTooltip } from "../parliament-seat-tooltip";

export const ParliamentSeat = () => {
  const { width } = useWindowDimensions();
  const { data } = useGetPartyCount({ regionId: "geo" });

  const [tootltip, setTooltip] = useState({
    x: 0,
    y: 0,
    partyId: "",
    show: false,
  });

  const parties = useMemo(
    () =>
      data?.reduce((acc: Record<string, PartyCount>, party) => {
        acc[party.id] = party;
        return acc;
      }, {}) ?? {},
    [data],
  );

  useEffect(() => {
    if (!data) return;

    const handleMouseLeave = () => {
      setTooltip((prev) => ({ ...prev, show: false }));
    };

    const seatMap: Record<string, string> = {};
    let seatNumber = 1;
    data.forEach((party) => {
      for (let i = 0; i < party.count; i++) {
        seatMap[`seat-${seatNumber}`] = party.id;
        seatNumber++;
      }
    });

    const seatElement = document.querySelector("#seats-map");
    if (!seatElement) return;

    seatElement.querySelectorAll("g g").forEach((e) => {
      const id = e.id;
      if (id.includes("seat")) {
        const party = parties[seatMap[id]];
        if (!party) return;

        e.setAttribute("cursor", "pointer");
        e.querySelector("path")?.setAttribute("fill", party.color);

        e.addEventListener("mouseenter", (event) => {
          if (e.id.includes("name")) return;

          const { clientX, clientY } = event as MouseEvent;

          setTooltip({
            show: true,
            x: clientX + 10,
            y: clientY + 10,
            partyId: seatMap[id],
          });
        });
        e.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    return () => {
      seatElement.querySelectorAll("g g").forEach((e) => {
        if (e.id.includes("seat")) {
          e.removeEventListener("mouseenter", () => console.log("remove"));
          e.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, [data, parties, width]);

  return (
    <div className="flex flex-1 items-center">
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-1 text-center md:w-[83%]">
          <span className="text-base font-medium md:text-xl">
            ผลการเลือกตั้ง ส.ส. ทั้งหมด
          </span>
          <span className="text-lg font-light text-[var(--primary)] md:text-2xl">
            <span className="text-2xl font-bold md:text-4xl">400</span> ที่นั่ง
          </span>
        </div>

        <div className="relative flex size-full max-h-full items-center justify-center">
          <PartySeat className="h-auto max-h-[50vh]" />
        </div>
      </div>

      <ParliamentSeatTooltip
        {...tootltip}
        partyCount={parties[tootltip.partyId]}
      />
    </div>
  );
};
