import axios from "axios";

import region1 from "@/data/votes/region-1.json";
import region2 from "@/data/votes/region-2.json";
import region3 from "@/data/votes/region-3.json";
import region5 from "@/data/votes/region-5.json";
import region6 from "@/data/votes/region-6.json";
import region7 from "@/data/votes/region-7.json";
import { regions } from "@/data/votes/regions";
import { PartyCount, Vote } from "@/types";

export const dynamic = "force-static";

const REGION_FILES: Record<string, Vote[]> = {
  "1": region1,
  "2": region2,
  "3": region3,
  "5": region5,
  "6": region6,
  "7": region7,
};

const getVotes = (regionId: string): Vote[] => {
  return REGION_FILES[regionId] ?? [];
};

const groupById = (data: Vote[]): Record<string, Vote[]> => {
  return data.reduce(
    (acc, vote) => {
      acc[vote.district_id] = acc[vote.district_id] || [];
      acc[vote.district_id].push(vote);
      return acc;
    },
    {} as Record<string, Vote[]>,
  );
};

const getPartyCount = (
  partyCount: Record<string, PartyCount>,
): PartyCount[] => {
  return Object.values(partyCount).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ regionId: string }> },
) {
  const regionId = (await params).regionId;
  const partyCount: Record<string, PartyCount> = {};

  if (regionId === "geo") {
    for (const voteGroup of Object.values(regions.votes)) {
      const party = voteGroup[0].candidate.party;
      partyCount[party.id] = {
        name: party.name_en,
        count: (partyCount[party.id]?.count || 0) + 1,
        image: party.image,
      };
    }
    return Response.json({ data: getPartyCount(partyCount) });
  }

  const host = new URL(request.url).origin;

  const votes = await getVotes(regionId);
  const votesByDistrict = groupById(votes);

  const { data: candidates } = await axios.get(`${host}/api/candidates`);

  Object.values(votesByDistrict).forEach((voteGroup) => {
    voteGroup.sort((a, b) => b.vote_count - a.vote_count);

    const topVote = voteGroup[0];
    const candidate = candidates.data[topVote.candidate_id];
    const party = candidate.party;
    partyCount[party.id] = {
      name: party.name_en,
      count: (partyCount?.[party.id]?.count ?? 0) + 1,
      image: party.image,
    };
  });

  return Response.json({ data: getPartyCount(partyCount) });
}
