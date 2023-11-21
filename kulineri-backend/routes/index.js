const express = require("express");
const router = express.Router();

const adminRoute = require("./admin.route");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const categoryRoute = require("./categories.route");

// welcome message
router.get("/", (req, res) => {
  res.json({
    message: "welcome to kulineri server",
  });
});

router.use(adminRoute);
router.use(userRoute);
router.use(productRoute);
router.use(categoryRoute);

module.exports = router;
