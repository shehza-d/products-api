import { IProduct } from "../types/index.js";
import express from "express";
import { db } from "../db/index.mjs";

const router = express.Router();

//   {
//     id: nanoid(), // always a number
//     name: "abc product",
//     price: "$23.12",
//     description: "abc product description",
//   }

router.get("/products", async (req, res) => {
  console.log("this is signup!", req.params);

  try {
    const products = db.collection<IProduct>("products");
    const data = products.find({});
    // if(!data)console.log('not found');
    console.log("data:::", data);
    res.status(200).send({
      message: "all products",
      data,
    });
  } catch (err) {
    res.status(500).send({ message: "error" });
    console.log("🚀 ~ file: db.ts:16 ~ err:", err);
  }
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  console.log("typeof", typeof id);

  //   if (isNaN(id)) {
  //     res.status(403).send("invalid product id");
  //   }

  //   if (isFound) {
  //     res.status(404);
  //     res.send({
  //       message: "product not found",
  //     });

  try {
    // const query = { _id: id };
    const products = db.collection<IProduct>("products");

    const data = await products.findOne({});
    // if (!data.length) console.log("no data");
    console.log("🚀 ~ file: product.mjs:52 ~ data:", data);
    res.send({
      message: "product found with id: ",
      data,
    });
  } catch (err) {
    res.status(500).send({ message: "error" });
    console.log("🚀 ~ file: db.ts:16 ~ err:", err);
  }
});

router.post("/product", async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.description) {
    res.status(403).send(`
	  required parameter 
	  
	  missing. example JSON request body:`);
  }
  console.log("body", req.body);
  try {
    const products = db.collection<IProduct>("products");

    const data = await products.insertOne({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });

    console.log("db data 2", data);
    // if (!data.length) console.log("no data");
    res.status(201).send({ message: "created product" });
  } catch (err) {
    res.send({ message: "error" });
    console.log("🚀 ~ file: db.ts:16 ~ err:", err);
  }
});

router.put("/product/:id", async (req, res) => {
  if (!req.body.name && !req.body.price && !req.body.description) {
    res.status(403).send(`
		required parameter missing. 
		at-least one parameter is required: name, price or description to complete update
		example JSON request body:
		{
		  name: "abc product",
		  price: "$23.12",
		  description: "abc product description"
		}`);
  }

  try {
    const products = db.collection<IProduct>("products");

    const data = await products.insertOne({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });

    // if (isFound) {
    //   res.status(404).send({
    //     message: "product not found",
    //   });
    // }

    console.log("db data 2", data);
    res.status(201).send({ message: "created product" });
  } catch (err) {
    res.status(500).send({ message: "error" });
    console.log("🚀 ~ file: db.ts:16 ~ err:", err);
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const products = db.collection<IProduct>("products");

    const data = await products.insertOne({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });

    // if (isFound) {
    //   res.status(404).send({
    //     message: "product not found",
    //   });
    // }

    console.log("db data 2", data);
    res.status(201).send({ message: "deleted product" });
  } catch (err) {
    res.status(500).send({ message: "error" });
    console.log("🚀 ~ file: db.ts:16 ~ err:", err);
  }
});

export { router as productRouter };

// apne sath log rakho for teaching replacment
