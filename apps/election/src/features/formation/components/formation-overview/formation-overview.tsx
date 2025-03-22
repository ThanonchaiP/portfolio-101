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
    <div className="flex flex-col justify-between py-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/formation"
            className="flex items-center gap-2 rounded-3xl bg-white px-6 py-2 text-[var(--primary)] shadow-md hover:text-orange-600"
          >
            <Icon icon="material-symbols:arrow-left-alt-rounded" />
            กลับ
          </Link>
        </div>

        <div className="flex flex-col items-center">
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

      <p className="mx-auto flex cursor-pointer items-center gap-1 font-bold text-gray-600 hover:text-gray-800">
        <Icon icon="material-symbols:settings-rounded" /> กรอกที่นั่ง
      </p>
    </div>
  );
};

export const FormationOverview = memo(FormationOverviewElement);
