import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "dreammaker";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  const client = new MongoClient(uri);
  return client.connect();
}

/**
 * Cached across hot reloads in dev and warm serverless invocations in
 * production — avoids opening a new connection pool on every request
 * (the standard Next.js + MongoDB pattern).
 */
function getClientPromise(): Promise<MongoClient> {
  if (!global.__mongoClientPromise) {
    global.__mongoClientPromise = createClientPromise();
  }
  return global.__mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
