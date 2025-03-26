"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";

import { Select } from "@/components/select";
import formations from "@/data/formations.json";

import { Formation } from "../../types";
import { FormationCandidateGroup } from "../formation-candidate-group";

import { OverviewTotal } from "./overview-total";

type FormationOverviewProps = {
  formation?: Formation;
};

const FormationOverviewElement = ({ formation }: FormationOverviewProps) => {
  const router = useRouter();

  const onChange = (value: string) => {
    router.push(`/formation/formula?id=${value}`);
  };

  return (
    <div className="flex justify-between gap-4 p-4 md:justify-start md:p-6 xl:flex-col xl:justify-between xl:gap-0 xl:px-0">
      <div className="flex gap-4 xl:flex-col">
        <div className="flex items-center justify-between xl:w-full">
          <Link
            href="/formation"
            className="flex items-center gap-2 rounded-3xl bg-white px-6 py-2 text-sm text-[var(--primary)] shadow-md hover:text-orange-600 md:text-base"
          >
            <Icon icon="material-symbols:arrow-left-alt-rounded" />
            กลับ
          </Link>
        </div>

        <div className="hidden flex-col items-center md:flex">
          <Select
            defaultValue={formation?.id ?? ""}
            onChange={onChange}
            options={formations.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
          <FormationCandidateGroup />
        </div>

        <OverviewTotal />
      </div>

      <p className="flex cursor-pointer items-center gap-1 text-sm font-bold text-gray-600 hover:text-gray-800 xl:mx-auto xl:text-base">
        <Icon icon="material-symbols:settings-rounded" /> กรอกที่นั่ง
      </p>
    </div>
  );
};

export const FormationOverview = memo(FormationOverviewElement);
