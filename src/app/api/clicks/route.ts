import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 링크별 클릭 수 조회: GET /api/clicks
export async function GET() {
  const clicks = await getClicksCollection();
  if (!clicks) {
    return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  const docs = await clicks.find().toArray();
  const counts = new Map(docs.map((doc) => [doc._id, doc.count]));

  return Response.json(
    profile.links.map((link) => ({
      id: link.id,
      title: link.title,
      clicks: counts.get(link.id) ?? 0,
    })),
  );
}
