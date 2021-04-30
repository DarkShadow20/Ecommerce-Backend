const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Product } = require("../models/products-model");

const cartItemSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = { CartItem };