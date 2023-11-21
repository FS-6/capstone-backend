const express = require("express");
const router = express.Router();

const { customerController } = require("../controllers/customer.controller");
const { cartController } = require("../controllers/cart.controller");
const {
  transactionController,
} = require("../controllers/transaction.controller");
const { verifyCustomer } = require("../middlewares/auth");
const { orderController } = require("../controllers/order.contoller");

// customer login & register
router.post("/user/login", customerController.login);
router.post("/user/register", customerController.register);

// get method
router.get("/user/carts", verifyCustomer, cartController.getCart);
router.get(
  "/user/transactions",
  verifyCustomer,
  transactionController.getTransaction
);
router.get("/user/orders", verifyCustomer, orderController.getOrder);

// post method
router.post("/user/carts/add", verifyCustomer, cartController.addCart);
router.post(
  "/user/transactions/add",
  verifyCustomer,
  transactionController.createTransaction
);
router.post("/user/orders/add", verifyCustomer, orderController.createOrder);

// delete method
router.delete(
  "/user/carts/delete/:cartId",
  verifyCustomer,
  cartController.deleteCart
);

module.exports = router;
