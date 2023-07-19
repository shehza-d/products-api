import { IProduct } from "../types/index.js";
import express from "express";
import { db } from "../db/index.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

const parameterMissing = {
  message: `Required parameter missing. At-least one parameter is required from name, price or description to complete update.`,
  exampleRequest: {
    id: "64b661974646eede5776adc6",
    name: "Samsung",
    price: 500,
    description:
      "Lorem Ipsum is simply dummy book. It has survived not only five centuries, software like Lorem Ipsum.",
  },
};

router.get("/products", async (req, res) => {
  try {
    const products = db.collection<IProduct>("products");
    const data = await products.find<IProduct>({}).toArray();

    if (!data.length) {
      res.status(404).send({ message: "Products Not Found" });
      return;
    }

    res.status(200).send({ message: "all products2", data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
    console.log("🚀 ~ file: product.mts ~ router ~ err:", err);
  }
});

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id::  ", id);

  try {
    const query = { _id: new ObjectId(id) };

    const products = db.collection<IProduct>("products");
    const data = await products.findOne<IProduct>(query);

    console.log("🚀 ~ file: product.mjs:52 ~ data:", data);
    if (!data) throw Error("Product Not Found!");

    res.send({ message: "Product found", data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
    console.log("🚀 ~ file: db.ts:16 ~ err:", err);
  }
});

// router.get("/product", async (req, res) =>
//   res.status(402).send({ message: "Product id missing" })
// );

router.post("/product", async (req, res) => {
  const { name, description } = req.body;
  const price = Number(req.body.price);

  // Validation
  if (
    !name ||
    !price ||
    !description ||
    isNaN(price) ||
    typeof name !== "string" ||
    typeof description !== "string"
  ) {
    res.status(403).send(parameterMissing);
    return;
  }

  try {
    const products = db.collection<IProduct>("products");
    const data = await products.insertOne({ name, price, description });

    if (data.acknowledged)
      res.status(201).send({
        message: "New Product Created!",
        id: data.insertedId.toString(),
      });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
    console.log("🚀 ~ file: product.mts ~ router ~ err:", err);
  }
});

router.put("/product", async (req, res) => {
  const { id, name, description } = req.body;
  const price = Number(req.body.price);

  // Validation
  // inma agar sab missing hongye tw true return hoga aur koi ak bhi available hua tw false return hoga
  if ((!name && !price && !description) || !id) {
    res.status(403).send(parameterMissing);
    return;
  }

  if (price && isNaN(price)) {
    res.status(403).send("Price missing");
    return;
  }
  if (name && typeof name !== "string") {
    res.status(403).send("NAME  missing");
    return;
  }
  if (description && typeof description !== "string") {
    res.status(403).send("description missing");
    return;
  }

  // res.status(201).send({ message: "Validation pass" });
  // return;

  try {
    const products = db.collection<IProduct>("products");

    // create a filter for a movie to update
    const filter = { name: "collestion testing" };
    // this option instructs the method to create a document if no documents match the filter
    // const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = { $set: { name, price, description } };

    const data = await products.updateOne(filter, updateDoc);

    // if (isFound) {
    //   res.status(404).send({
    //     message: "product not found",
    //   });
    // }

    console.log("db data 2", data);
    res.status(201).send({ message: "Product update" });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
    console.log("🚀 ~ file: product.mts ~ router ~ err:", err);
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const products = db.collection<IProduct>("products");
    // const query =  { _id : `ObjectId("563237a41a4d68582c2509da")` }
    const query = { _id: { $oid: "563237a41a4d68582c2509da" } };
    // const query = { price: "req.body.price",};

    const result = await products.deleteOne(query);

    // if (isFound) {
    //   res.status(404).send({
    //     message: "product not found",
    //   });
    // }
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      throw new Error("No documents matched the query. Deleted 0 documents.");
    }

    console.log("db data 2", result);
    res.status(201).send({ message: "deleted product" });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
    console.log("🚀 ~ file: product.mts ~ router ~ err:", err);
  }
});

export { router as productRouter };

// apne sath log rakho for teaching replacment
