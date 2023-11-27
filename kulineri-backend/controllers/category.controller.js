const { Category } = require("../models");

const categoryController = {
  getAllCategory: async (req, res, next) => {
    try {
      const categories = await Category.find({});
      if (!categories || categories.length === 0) {
        res.status(400).json({
          message: "Belum ada kategori",
        });
      }

      res.status(200).json({
        message: "Berhasil medapatkan data kategori",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },
  getOneCategory: async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const category = await Category.findById(categoryId);
      if (!category) {
        res.status(400).json({
          message: "Kategori tidak tersedia",
        });
      }

      res.status(200).json({
        message: "Berhasil mendapatkan kategori berdasarkan id",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },
  addCategory: async (req, res, next) => {
    try {
      const { name } = req.body;

      const newCategory = await Category.create({
        name,
      });

      if (!newCategory) {
        res.status(401).json({
          message: "Gagal menambahkan kategori",
        });
      }

      res.status(201).json({
        message: "Berhasil menambahkan kateogori",
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  },
  editCategory: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const data = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        data,
        {
          new: true,
        }
      );

      if (!updatedCategory) {
        return res.status(400).json({
          message: "Gagal mendupdate kategori",
        });
      }

      res.status(200).json({
        message: "Berhasil mengupdate kategori",
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteOneCategory: async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
        res.status(404).json({
          message: "Kategori tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Kategori berhasil di hapus",
      });
    } catch (error) {
      next(error);
    }
  },
  deleteAllCategory: async (req, res, next) => {
    try {
      const deletedCategory = await Category.deleteMany({});

      if (deletedCategory.deletedCount === 0) {
        return res.status(404).json({
          message: "Tidak kategori yang dihapus, data masih kosong",
        });
      }

      res.status(200).json({
        message: "Berhasil menghapus semua kategori",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { categoryController };
