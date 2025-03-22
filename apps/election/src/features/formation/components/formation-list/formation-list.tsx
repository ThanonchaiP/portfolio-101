import { useGetPartyCount } from "@/features/geo";
import { useListFormation } from "@/features/result";
import { PartyCount } from "@/types";

import { FormationItem } from "./formation-item";

export const FormationList = () => {
  const { data } = useListFormation();
  const parties = useGetPartyCount({ regionId: "geo" });

  const partiesObj =
    parties.data?.reduce((acc: Record<string, PartyCount>, party) => {
      acc[party.id] = party;
      return acc;
    }, {}) ?? {};

  return (
    <div className="flex w-full justify-center">
      <div className="mt-6 grid w-[90%] grid-cols-3 gap-8">
        {data?.data.map((formation) => {
          const totalSeats = formation.governmentPartyRefCodes.reduce(
            (acc, partyId) => acc + (partiesObj[partyId]?.count || 0),
            0,
          );

          const [first, second, third] = formation.governmentPartyRefCodes;
          const imageUrl = [
            partiesObj[first]?.candidate_img,
            partiesObj[second]?.candidate_img,
            partiesObj[third]?.candidate_img,
          ];

          return (
            <FormationItem
              id={formation.id}
              key={formation.id}
              totalSeats={totalSeats}
              imageUrl={imageUrl}
              label={formation.label}
            />
          );
        })}
      </div>
    </div>
  );
};
