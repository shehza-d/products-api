import { MongoClient, type Db } from "mongodb";
import { MONGO_URI, DB_NAME } from "../config/index.mjs";

let db: Db;

try {
  const client = new MongoClient(MONGO_URI);
  db = client.db(DB_NAME);
} catch (err) {
  console.log("🚀 ~ file: db.ts:16 ~ err:", err);
}

export { db };

// "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/server.mjs\"",

// finally {
//   // Ensures that the client will close when you finish/error
//   await client.close(); }
