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

// finally {
//   // Ensures that the client will close when you finish/error
//   await client.close(); }

// const userSchema = new mongoose.Schema({
//   firstName: { type: String },
//   lastName: { type: String },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   isActive: { type: Boolean, default: true },
// following: [{ type: mongoose.ObjectId }, ref: "Users"],
// followers: [{ type: mongoose.ObjectId }, ref: "Users"],

//   createdOn: { type: Date, default: Date.now },
// });
// userSchema.index({ firstName: "text", lastName: "text" });
// export const userModel = mongoose.model("Users", userSchema);
