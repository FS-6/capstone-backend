const express = require("express");
const router = express.Router();

const { categoryController } = require("../controllers/category.controller");

router.get("/categories", categoryController.getAllCategory);
router.get("/categories/:categoryId", categoryController.getOneCategory);

module.exports = router;
