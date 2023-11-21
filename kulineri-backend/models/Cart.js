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
    default: function () {
      return this.product ? this.product.price : 0;
    },
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
