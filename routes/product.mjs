import express from "express";

const router = express.Router();

//   {
//     id: nanoid(), // always a number
//     name: "abc product",
//     price: "$23.12",
//     description: "abc product description",
//   }

// GET     /api/v1/post/:userId/:postId
router.get("/post/:userId/", (req, res, next) => {
  console.log("this is signup!", req.params);
  res.send("post created");
});

app.get("/products", (req, res) => {
  res.send({
    message: "all products",
    data: products,
  });
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  console.log("typeof", typeof id);

  if (isNaN(id)) {
    res.status(403).send("invalid product id");
  }

  if (isFound) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    res.send({
      message: "product found with id: " + products[isFound].id,
      data: products[isFound],
    });
  }
});

app.post("/product", (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.description) {
    res.status(403).send(`
	  required parameter 
	  
	  missing. example JSON request body:`);
  }
  res.status(201).send({ message: "created product" });
});

app.put("/product/:id", (req, res) => {
  if (!req.body.name && !req.body.price && !req.body.description) {
    res.status(403).send(`
		required parameter missing. 
		atleast one parameter is required: name, price or description to complete update
		example JSON request body:
		{
		  name: "abc product",
		  price: "$23.12",
		  description: "abc product description"
		}`);
  }

  if (isFound) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    res.send({
      message: "product is updated with id: " + products[isFound].id,
      data: products[isFound],
    });
  }
});

app.delete("/product/:id", (req, res) => {
  if (isFound === false) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    products.splice(isFound, 1);

    res.send({
      message: "product is deleted",
    });
  }
});

export { router as productRouter };
