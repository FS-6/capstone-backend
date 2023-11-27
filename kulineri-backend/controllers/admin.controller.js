const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminController = {
  // admin register
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // Validasi input
      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Semua field harus diisi",
        });
      }

      // Periksa apakah admin sudah terdaftar dengan email tertentu
      const adminAlreadyExist = await Admin.findOne({ email: email });
      if (adminAlreadyExist) {
        return res.status(400).json({
          message: "Email sudah terpakai",
        });
      }

      // Hash password dengan menggunakan bcrypt
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Buat admin baru
      const newAdmin = await Admin.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "Berhasil membuat akun admin",
        data: newAdmin,
      });
    } catch (error) {
      next(error);
    }
  },
  // admin login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Semua field harus di isi",
        });
      }

      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return res.status(400).json({ message: "Email tidak terdaftar" });
      }

      const checkPassword = bcrypt.compareSync(password, admin.password);
      if (!checkPassword) {
        return res.status(400).json({ message: "Password tidak sesuai" });
      }

      // Set expiration time (2 hours in this case)
      const expiresIn = 2 * 60 * 60; // 2 hours in seconds

      // Create JWT with expiration time
      const token = jwt.sign(
        { _id: admin._id, email: admin.email },
        process.env.MASTER_KEY,
        { expiresIn: expiresIn }
      );

      res.status(200).header("Authorization", token).json({
        token: token,
      });
    } catch (error) {
      next(error);
    }
  },
  // admin edit data
  editAdmin: async (req, res, next) => {
    try {
      const { adminId } = req.params;
      const { password, ...data } = req.body;

      // Hash password hanya jika ada password baru
      const hashedPassword = password
        ? bcrypt.hashSync(password, 12)
        : undefined;

      // Jika hashedPassword tidak undefined, set data.password menjadi hashedPassword
      if (hashedPassword !== undefined) {
        data.password = hashedPassword;
      }

      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, data, {
        new: true,
      });

      if (!updatedAdmin) {
        return res.status(400).json({
          message: "Gagal mendupdate admin",
        });
      }

      res.status(200).json({
        message: "Berhasil mengupdate admin",
        data: updatedAdmin,
      });
    } catch (error) {
      next(error);
    }
  },
  // admin delete account
  deleteAdmin: async (req, res, next) => {
    try {
      const { adminId } = req.params;

      const deletedAdmin = await Admin.findByIdAndDelete(adminId);

      if (!deletedAdmin) {
        return res.status(404).json({
          message: "Admin tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Berhasil menghapus admin dengan ID",
        data: deletedAdmin,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { adminController };
