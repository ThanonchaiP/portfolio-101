"use client";

import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/modal";

import { useGetPartyCount } from "../../api/get-party-count";

import { GeoPartyCountItem } from "./geo-party-count-item";

export const GeoPartyCount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const regionId = (useParams().region ?? "geo") as string;
  const parties = useGetPartyCount({ regionId }).data ?? [];

  const topParties = parties.slice(0, 5);
  const otherParties = parties.slice(5);
  const otherPartiesSeatsCount = otherParties.reduce(
    (acc, party) => acc + party.count,
    0,
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="mt-2">
      <h3 className="text-[21px]">ผลคะแนน</h3>

      <div className="mt-4 flex flex-col gap-2">
        {topParties.map((party) => (
          <GeoPartyCountItem key={party.name} {...party} eclipse />
        ))}

        {otherParties.length > 0 && (
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={handleOpenModal}
          >
            <div className="mx-2 inline-block size-4 bg-slate-400" />
            <h3>
              พรรคอื่น ๆ ({otherPartiesSeatsCount} ที่นั่ง)
              <Icon
                icon="material-symbols:info"
                className="ml-1 inline-block pb-[2px] text-lg text-gray-500"
              />
            </h3>
          </div>
        )}
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col gap-2">
          <h2 className="mb-1 text-xl text-[var(--primary)]">
            พรรคอื่น ๆ ({otherPartiesSeatsCount} ที่นั่ง)
          </h2>
          {otherParties.map((party) => (
            <GeoPartyCountItem key={party.name} {...party} />
          ))}
        </div>
      </Modal>
    </div>
  );
};
