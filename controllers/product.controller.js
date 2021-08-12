const {Product} = require("../models/product.model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get the list of products",
      errMessage: err.message,
    });
  }
};

const findProduct = async (req, res, next, proId) => {
  try {
    const product = await Product.findById(proId);
    if (!product) {
      throw Error("Unable to fetch the product");
    }
    req.product = product;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrive the product" });
  }
};

const getProductById = async (req, res) => {
  const { product } = req;
  product.__v = undefined;
  res.json({ success: true, product });
};

module.exports = { getProducts,  findProduct, getProductById };
