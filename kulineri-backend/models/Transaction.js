const mongoose = require("mongoose");
const { generateRandomCode } = require("../utils/helper");

const transactionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    transaction_code: {
      type: String,
      default: generateRandomCode,
      required: true,
    },
    payment: {
      type: String,
      enum: ["DANA", "OVO", "COD"],
      required: true,
    },
    shipping: {
      type: String,
      enum: ["Jne", "Si Cepat", "Ninja Express"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
