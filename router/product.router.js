const express = require("express");
const router = express.Router();
const { getProducts,findProduct,getProductById} = require("../controllers/product.controller");

router.route("/").get(getProducts)
router.param("productId", findProduct);
router.route("/:productId").get(getProductById)

module.exports = router;