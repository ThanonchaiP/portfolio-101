export type Vote = {
  id: string;
  district_id: string;
  candidate_id: string;
  vote_count: number;
  district?: District;
  candidate?: Candidate;
};

export type District = {
  id: string;
  name_th: string;
  name_en: string;
  province_id: string;
};

export type Candidate = {
  id: string;
  name_th: string;
  name_en: string;
  partyId: string;
  image: string;
};

export type Party = {
  id: string;
  name_th: string;
  name_en: string;
  image: string;
  color: string;
};

export type PartyCount = Party & {
  count: number;
};
