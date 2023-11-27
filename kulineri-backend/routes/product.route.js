const express = require("express");
const router = express.Router();

const { productController } = require("../controllers/product.controller");

router.get("/products", productController.getAllProduct);
router.get("/products/:productId", productController.getOneProduct);
router.get("/products/name/:productName", productController.getProductByName);
router.get(
  "/products/category/:categoryId",
  productController.getProductByCategory
);

module.exports = router;
