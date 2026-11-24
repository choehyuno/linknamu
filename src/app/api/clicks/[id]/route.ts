import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 링크 클릭 1회 기록: POST /api/clicks/{linkId}
export async function POST(_req: Request, ctx: RouteContext<"/api/clicks/[id]">) {
  const { id } = await ctx.params;

  // profile.ts에 있는 링크만 집계합니다. (임의의 값이 DB에 쌓이는 것 방지)
  if (!profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 404 });
  }

  const clicks = await getClicksCollection();
  if (!clicks) {
    return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
  return new Response(null, { status: 204 });
}
