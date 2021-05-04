const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./db/db.connect");
const { fillProductsCollection } = require("./models/products-model");
const productsRouter = require("./router/product-router");
const cartRouter = require("./router/cart-router");
const wishlistRouter = require("./router/wishlist-router");

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API for Nile");
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`App started on ${port}!`);
});