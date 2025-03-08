import axios from "axios";

import { PartyCount, Vote } from "@/types";

export const dynamic = "force-static";

const getVotes = async (regionId: string) => {
  switch (regionId) {
    case "1":
      return import("@/data/votes/region-1.json").then((data) => data.default);
    case "2":
      return import("@/data/votes/region-2.json").then((data) => data.default);
    case "3":
      return import("@/data/votes/region-3.json").then((data) => data.default);
    case "5":
      return import("@/data/votes/region-5.json").then((data) => data.default);
    case "6":
      return import("@/data/votes/region-6.json").then((data) => data.default);
    case "7":
      return import("@/data/votes/region-7.json").then((data) => data.default);
    default:
      return [];
  }
};

function groupById(data: Vote[]) {
  return data.reduce((result: Record<string, Vote[]>, item: Vote) => {
    // Get the ID to use as key
    const id = item.district_id;

    // If this ID doesn't exist in our result yet, create an empty array for it
    if (!result[id]) result[id] = [];

    // Add the current item to the array for this ID
    result[id].push(item);

    return result;
  }, {});
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ regionId: string }> },
) {
  const regionId = (await params).regionId;

  const host = request.url.replace(/\/api\/regions\/.*/, "");

  const votes = await getVotes(regionId);
  const votesObj = groupById(votes);

  const candidates = (await axios.get(`${host}/api/candidates`)).data;

  const partyCount = {} as Record<string, PartyCount>;

  //sort votes by vote_count
  Object.values(votesObj).forEach((voteGroup) => {
    voteGroup.sort((a, b) => b.vote_count - a.vote_count);
    voteGroup.length = Math.min(voteGroup.length, 1); // Keep only top 1 items
    voteGroup.map((vote) => {
      const candidate = candidates.data[vote.candidate_id];
      const party = candidate.party;

      partyCount[party.id] = {
        name: party.name_en,
        count: (partyCount?.[party.id]?.count ?? 0) + 1,
        image: party.image,
      };

      vote.candidate = candidate;
      return vote;
    });
  });

  //sort partyCount by count , name
  const partyCountArray = Object.values(partyCount).sort((a, b) => {
    if (a.count === b.count) {
      return a.name.localeCompare(b.name);
    }
    return b.count - a.count;
  });

  const data = { data: partyCountArray };

  return Response.json(data);
}
