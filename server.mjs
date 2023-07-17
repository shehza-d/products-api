import express from "express";
import path from "path";
import { productRouter } from "./routes/product.mjs";

// import { customAlphabet } from "nanoid";
// const nanoid = customAlphabet("1234567890", 20);

const __dirname = path.resolve();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/api/v1", productRouter);
app.use(express.static(path.join(__dirname, "public")));

app.get("/testing", (req, res) => res.send("server testing ok"));

app.listen(port, () => console.log(`app listening on port ${port}`));
