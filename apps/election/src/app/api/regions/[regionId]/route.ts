import axios from "axios";

import regions from "@/data/regions.json";
import { Vote } from "@/types";

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

  const region = regions.find((region) => region.id === regionId) ?? [];

  const votes = await getVotes(regionId);
  const votesObj = groupById(votes);

  const districts = (await axios.get(`${host}/api/districts`)).data;
  const candidates = (await axios.get(`${host}/api/candidates`)).data;

  //sort votes by vote_count
  Object.values(votesObj).forEach((voteGroup) => {
    voteGroup.sort((a, b) => b.vote_count - a.vote_count);
    voteGroup.length = Math.min(voteGroup.length, 2); // Keep only top 2 items
    voteGroup.map((vote) => {
      vote.district = districts.data[vote.district_id];
      vote.candidate = candidates.data[vote.candidate_id];
      return vote;
    });
  });

  const data = {
    data: {
      ...region,
      votes: votesObj,
    },
  };

  return Response.json(data);
}
