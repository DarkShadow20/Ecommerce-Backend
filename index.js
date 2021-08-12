const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./db/db.connect");
//const { fillProductsCollection } = require("./models/product.model");

const app=express();
const port=4000;
app.use(cors());
app.use(bodyParser.json());

connectDB();
//fillProductsCollection();

//middlewares
const errorHandler=require("./middlewares/errorHandler");
const routeHandler=require("./middlewares/routeHandler");

//routes
const userRouter=require("./routes/users.router")
const wishlistRouter = require("./routes/wishlist.router");
const productRouter = require("./routes/product.router");
const cartRouter=require("./routes/cart.router")

app.use("/users",userRouter)
app.use('/wishlists', wishlistRouter);
app.use("/products", productRouter);
app.use("/cart",cartRouter);

app.get("/", (req, res) => {
  res.send("API for Nile");
});

app.use(routeHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log(`App started on ${port}!`);
})