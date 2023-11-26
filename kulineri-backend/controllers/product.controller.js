const { Product } = require("../models");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const productController = {
  getAllProduct: async (req, res, next) => {
    try {
      const products = await Product.find({});
      if (!products || products.length === 0) {
        res.status(400).json({
          message: "Produk masih kosong, belum ada data",
        });
      }

      res.status(200).json({
        message: "Berhasil mendapatkan semua data produk",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
  getOneProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;

      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({
          message: "Produk yang anda cari tidak di temukan",
        });
      }

      res.status(200).json({
        message: "Berhasil mendapatkan produk dengan id",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
  getProductByName: async (req, res, next) => {
    try {
      const { productName } = req.params;

      const product = await Product.find({
        name: { $regex: productName, $options: "i" },
      });
      if (!product || product.length === 0) {
        res.status(404).json({
          message: "Produk yang anda cari tidak di temukan",
        });
      }

      res.status(200).json({
        message: "Berhasil mendapatkan produk dengan nama",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
  getProductByCategory: async (req, res, next) => {
    const categoryId = req.params.categoryId;

    try {
      const client = await MongoClient.connect(process.env.DB_URL);
      const collection = client.db("kulineri_db").collection("products");

      const products = await collection
        .find({ category: categoryId })
        .toArray();

      if (!products || products.length === 0) {
        return res.status(404).json({
          message: "Tidak ada produk dalam kategori ini",
        });
      }

      res.status(200).json({
        message: "Berhasil mendapatkan produk berdasarkan kategori",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
  addProduct: async (req, res, next) => {
    try {
      const { name, description, price, stock, image, category } = req.body;

      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        image,
        category,
      });
      if (!newProduct) {
        res.status(401).json({
          message: "Gagal menambahkan produk",
        });
      }

      res.status(201).json({
        message: "Berhasil menambahkan product",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  editProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const data = req.body;

      const editedProduct = await Product.findByIdAndUpdate(productId, data, {
        new: true,
      });

      if (!editedProduct) {
        res.status(400).json({
          message: "Gagal mengupdate produk",
        });
      }

      res.status(200).json({
        message: "Berhasil mengupdate produk",
        data: editedProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteOneProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;

      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        res.status(404).json({
          message: "Produk tidak di temukan",
        });
      }

      res.status(200).json({
        message: "Berhasil mengahapus produk",
        data: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteAllProduct: async (req, res, next) => {
    try {
      const deletedProduct = await Product.deleteMany({});
      if (deletedProduct.deletedCount === 0) {
        res.status(400).json({
          message: "Tidak ada produk dihapus, data masih kosong",
        });
      }

      res.status(200).json({
        message: "Berhasil meghapus semua produk",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { productController };
