const mongoose = require("mongoose");
const { Schema } = mongoose;
const productsData = require("./product-data");

const productSchema = new Schema({
   name:{
      type: String,
      required: "Name of the product is a required attribute",
  },
  image: String,
  category: String,
  price: {
      type: Number,
      required: "Price value of the product is required"
  },
  inStock: Boolean,
  fastDelivery: Boolean,
  quantity:Number,
 rating: Number,
});

const Product = mongoose.model("Product", productSchema);


const fillProductsCollection= async ()=> {
  try {
    productsData.forEach(async (product) => {
      const newProduct = new Product(product);
      const savedProduct = await newProduct.save();
      console.log(savedProduct);
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { Product, fillProductsCollection };
