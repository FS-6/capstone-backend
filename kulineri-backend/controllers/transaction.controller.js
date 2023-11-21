const { Transaction, Cart } = require("../models");

const transactionController = {
  getTransaction: async (req, res, next) => {
    try {
      const customerId = req.customer._id;
      const transaction = await Transaction.find({ customer: customerId });

      if (!transaction || transaction.length === 0) {
        res.status(400).json({
          message: "Transaksi masih kosong",
        });
      }

      res.status(200).json({
        message: "Berhasil mendapatkan data transaksi",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  },
  createTransaction: async (req, res, next) => {
    try {
      const customerId = req.customer._id;
      const { cart, payment, shipping } = req.body;

      // Validasi cart
      const existingCart = await Cart.findById(cart);
      if (!existingCart) {
        return res.status(404).json({
          message: "Keranjang tidak ditemukan. Transaksi gagal.",
        });
      }

      // Buat transaksi
      const newTransaction = await Transaction.create({
        customer: customerId,
        cart: cart,
        payment: payment,
        shipping: shipping,
        status: "success",
      });

      if (!newTransaction) {
        return res.status(400).json({
          message: "Transaksi gagal",
        });
      }

      return res.status(200).json({
        message: "Transaksi Sukses",
        data: newTransaction,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { transactionController };
