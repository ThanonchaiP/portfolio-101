import formation from "@/data/formation.json";

export const dynamic = "force-static";

export async function GET() {
  const data = formation;
  return Response.json({ data });
}
