export const dynamic = "force-static";

export async function GET() {
  const data = {
    data: [
      {
        id: 1,
        title: "Hello World",
        body: "This is a post",
      },
    ],
  };

  return Response.json(data);
}
