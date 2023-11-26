const express = require("express");
const router = express.Router();

const { adminController } = require("../controllers/admin.controller");
const { customerController } = require("../controllers/customer.controller");
const { productController } = require("../controllers/product.controller");
const { categoryController } = require("../controllers/category.controller");
const { verifyAdmin } = require("../middlewares/auth");

// admin login & register
router.post("/admin/login", adminController.login);
router.post("/admin/register", adminController.register);

//  get all
router.get("/admin/customers", verifyAdmin, customerController.getCustomer);
router.get("/admin/products", verifyAdmin, productController.getAllProduct);
router.get("/admin/categories", verifyAdmin, categoryController.getAllCategory);

// get one
router.get(
  "/admin/categories/:categoryId",
  verifyAdmin,
  categoryController.getOneCategory
);
router.get(
  "/admin/products/:productId",
  verifyAdmin,
  productController.getOneProduct
);
router.get(
  "/admin/customers/:customerId",
  verifyAdmin,
  customerController.getOneCustomer
);

// get product by category
router.get(
  "/admin/products/category/:categoryId",
  verifyAdmin,
  productController.getProductByCategory
);

// post
router.post("/admin/customers/add", verifyAdmin, customerController.register);
router.post("/admin/products/add", verifyAdmin, productController.addProduct);
router.post(
  "/admin/categories/add",
  verifyAdmin,
  categoryController.addCategory
);

// edit
router.put(
  "/admin/products/edit/:productId",
  verifyAdmin,
  productController.editProduct
);
router.put(
  "/admin/categories/edit/:categoryId",
  verifyAdmin,
  categoryController.editCategory
);

// delete all
router.delete(
  "/admin/products/delete",
  verifyAdmin,
  productController.deleteAllProduct
);
router.delete(
  "/admin/categories/delete",
  verifyAdmin,
  categoryController.deleteAllCategory
);

// delete one
router.delete(
  "/admin/customers/delete/:customerId",
  verifyAdmin,
  customerController.deleteOneCustomer
);
router.delete(
  "/admin/products/delete/:productId",
  verifyAdmin,
  productController.deleteOneProduct
);
router.delete(
  "/admin/categories/delete/:categoryId",
  verifyAdmin,
  categoryController.deleteOneCategory
);

module.exports = router;
