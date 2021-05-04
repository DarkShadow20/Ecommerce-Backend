const express = require("express");
const { Product } = require("../models/products-model");
const router = express.Router();

router.get("/", async (req, res) => {
  try{
    const products=await Product.find({});
    res.json(products);
  }
  catch(err){
    res.json({success:"false",message:"error in fetching products",
    errMessage:err})
  }
});
router.get("/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  }
  catch(err){
    res.json({success:"false",message:"error in fetching products",
    errMessage:err})
  }
  });


module.exports = router;