import axios from "axios";
import { NextResponse } from "next/server";

import { API_URL } from "@/config";
import formations from "@/data/formations.json";
import { PartyCount } from "@/types";

export const dynamic = "force-static";

export async function GET(
  request: Request,
  { params }: { params: { formationId: string } },
) {
  try {
    const { formationId } = params;
    const { data } = await axios.get(`${API_URL}/regions/geo/party-count`);
    const partyCountMap = Object.fromEntries(
      data.data.map((party: PartyCount) => [party.id, party]),
    );

    const formation = formations.find((f) => f.id === formationId);
    if (!formation) {
      return NextResponse.json(
        { message: "Data not found", code: 404 },
        { status: 404 },
      );
    }

    const mapPartyRefs = (partyRefs: string[]) =>
      partyRefs.map((id) => partyCountMap[id]);

    return NextResponse.json({
      data: {
        ...formation,
        governmentPartyRefCodes: mapPartyRefs(
          formation.governmentPartyRefCodes,
        ),
        oppositionPartyRefCodes: mapPartyRefs(
          formation.oppositionPartyRefCodes,
        ),
        otherPartyRefCodes: mapPartyRefs(formation.otherPartyRefCodes),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Internal Server Error", code: 500 },
        { status: 500 },
      );
    } else {
      console.error("An unknown error occurred");
    }
  }
}
