const express = require("express");
const { WishlistItem } = require("../models/wishlist-model");

const router = express.Router();

router.route("/").get(async (req,res)=>{
  try {
      const wishItems = await WishlistItem.find().populate("_id");
      const normalizedWishItems = wishItems.map((item) => {
         const { _id, ...doc } = item._id._doc;
        return { id: _id, ...doc, quantity: item.quantity };
      });
      res.json(normalizedWishItems);
    }
    catch (err) {
      res.status(500).json({ success: false, message: "Could not fetch your wishlist"})
    }
}).post(async(req,res)=>{
  try{
    const product = req.body;
    const { id } = product;
    const wishItem = new WishlistItem({ _id: id });
    await wishItem.save();
  res.status(201).json(product);
  }catch(err){
    res.status(500).json({success:false,message:"Could not add to your wishlist"})
  }
})

router.route("/:id").delete(async(req,res)=>{
  try{
    const {id}=req.params;
    await WishlistItem.findByIdAndDelete(id)
    res.status(204).json({message:"wishlistitem successfully deleted"})
  }
  catch(err){
    res.json({message:"Sorry wishlist item not deleted"})
  }
})
module.exports = router;