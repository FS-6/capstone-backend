const { Order, Transaction } = require("../models");

const orderController = {
  getOrder: async (req, res, next) => {
    try {
      const customerId = req.customer._id;
      const orders = await Order.find({ customer: customerId });
      if (!orders || orders.length === 0) {
        res.status(400).json({
          message: "Anda belum pernah order produk",
        });
      }
      res.status(200).json({
        message: "Berhasil mendapatkan data order",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  },
  getOneOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          message: "Order tidak ditemukan",
        });
      }
      return res.status(200).json({
        message: "Berhasil mendapatkan order",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  },
  createOrder: async (req, res, next) => {
    try {
      const customerId = req.customer._id;
      const { transactionId } = req.body;

      // Validasi transaction
      const existingTransaction = await Transaction.findById(transactionId);
      if (!existingTransaction) {
        return res.status(404).json({
          message: "Transaksi tidak ditemukan. Order gagal.",
        });
      }

      // Buat order
      const newOrder = await Order.create({
        customer: customerId,
        transaction: transactionId,
      });

      if (!newOrder) {
        return res.status(400).json({
          message: "Order gagal",
        });
      }

      return res.status(200).json({
        message: "Berhasil order",
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findByIdAndDelete(orderId);
      if (!order) {
        return res.status(404).json({
          message: "Order tidak ditemukan",
        });
      }
      return res.status(200).json({
        message: "Berhasil menghapus order",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { orderController };
