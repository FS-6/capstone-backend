const { Cart, Product } = require("../models");

const cartController = {
  getCart: async (req, res, next) => {
    try {
      const customerId = req.customer._id;
      const carts = await Cart.find({ customer: customerId });

      if (!carts || carts.length === 0) {
        return res.status(404).json({
          message: "Anda belum memiliki belanjaan apapun",
        });
      }

      return res.status(200).json({
        message: "Berhasil mendapatkan seluruh keranjang",
        data: carts,
      });
    } catch (error) {
      next(error);
    }
  },
  getOneCart: async (req, res, next) => {
    try {
      const { cartId } = req.params;

      const cart = await Cart.findById(cartId);

      if (!cart) {
        return res.status(404).json({
          message: "Keranjang tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "Berhasil mendapatkan semua keranjang",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  },
  addCart: async (req, res, next) => {
    try {
      const customerId = req.customer._id;
      const { productId, quantity } = req.body;

      const productExist = await Product.findById(productId);
      if (!productExist) {
        return res.status(404).json({
          message: "Produk tidak di temukan",
        });
      }

      // Cari apakah produk sudah ada dalam keranjang
      const existingCartItem = await Cart.findOne({
        customer: customerId,
        product: productId,
      });

      if (existingCartItem) {
        // Jika produk sudah ada, perbarui quantity dan totalPrice
        existingCartItem.quantity = quantity;
        await existingCartItem.save();

        return res.status(200).json({
          message: "Sukses memperbarui keranjang",
          data: existingCartItem,
        });
      }

      // Jika produk belum ada, tambahkan ke keranjang
      const cartItem = new Cart({
        customer: customerId,
        product: productId,
        quantity: quantity,
      });

      // Simpan cartItem
      await cartItem.save();

      res.status(200).json({
        message: "Sukses menambahkan produk ke keranjang",
        data: cartItem,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteCart: async (req, res, next) => {
    try {
      const { cartId } = req.params;

      const deletedCart = await Cart.findByIdAndDelete(cartId);

      if (!deletedCart) {
        return res.status(404).json({ message: "Data cart tidak ditemukan" });
      } else {
        return res.json({ message: "Sukses menghapus keranjang" });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { cartController };
