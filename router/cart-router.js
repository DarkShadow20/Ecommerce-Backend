const express = require("express");
const {CartItem} = require("../models/cart-model");
const router = express.Router();

router.route("/")
.get( async (req,res)=>{
    try {
      const cartItems = await CartItem.find().populate("_id");
      const normalizedCartItems = cartItems.map((item) => {
         const { _id, ...doc } = item._id._doc;
        return { id: _id, ...doc, quantity: item.quantity };
      });
      res.status(201).json(normalizedCartItems);
    }
    catch (err) {
      res.status(500).json({ success: false, message: "Could not fetch your cart"})
    }
}).post(async (req,res)=>{
  try{
  const product = req.body;
  const { id, quantity } = product;
  const cartItem = new CartItem({ _id: id, quantity });
  await cartItem.save();
  res.status(201).json(cartItem);
  }
  catch(err){
    res.status(500).json({message:"Soory"})
  }
})

router.route("/:id").post(async (req,res)=>{
  try{
    const { quantity } = req.body;
    const { id } = req.params;
    await CartItem.findByIdAndUpdate(id, { quantity });
    res.status(201).json({ quantity });
  }catch(err){
    res.status(500).json({message:"Sorry"})
  }
}).delete(async(req,res)=>{
  try{
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.status(204).json({message:"successfully deleted"});
  }
  catch(err){
    res.status(500).json({message:"failed in deleting"})
  }
})

module.exports = router;