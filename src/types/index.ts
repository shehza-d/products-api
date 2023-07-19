import type { ObjectId } from "mongodb";

export interface IProduct {
  _id?: ObjectId;
  name: string;
  price: number;
  description: string;
}
