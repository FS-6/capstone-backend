const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  totalPrice: {
    type: Number,
  },
});

// Pre-save middleware to calculate totalPrice
cartSchema.pre("save", async function (next) {
  try {
    // Check if the product is available
    if (!this.product) {
      throw new Error("Product not specified");
    }

    // Fetch the product details
    const product = await mongoose.model("Product").findById(this.product);

    // Calculate total price based on product price and quantity
    this.totalPrice = product.price * this.quantity;

    next();
  } catch (error) {
    next(error);
  }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
