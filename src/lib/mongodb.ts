import { MongoClient } from "mongodb";

// 개발 중 핫 리로드마다 새 연결이 생기지 않도록 전역에 한 번만 만들어 둡니다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 없으면 null을 돌려줍니다. (클릭 집계만 꺼지고 페이지는 정상 동작) */
export function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo.mongoClientPromise;
}

export async function getClicksCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client
    .db(process.env.MONGODB_DB ?? "linknamu")
    .collection<{ _id: string; count: number }>("clicks");
}
