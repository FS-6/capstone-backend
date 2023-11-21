const mongoose = require("mongoose");
const { generateRandomCode } = require("../utils/helper");
const { Schema } = mongoose;

const orderSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  order_code: {
    type: String,
    default: generateRandomCode,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["processed", "completed", "canceled"],
    default: "processed",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
