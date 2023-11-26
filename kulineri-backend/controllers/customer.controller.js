const { Customer } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const customerController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, address } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Semua field harus diisi",
        });
      }

      const saltRounds = 12;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      const newCustomer = await Customer.create({
        name,
        email,
        password: hashedPassword,
        address,
      });

      res.status(201).json({
        message: "Berhasil membuat akun",
        data: newCustomer,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Semua field harus di isi",
        });
      }

      const customer = await Customer.findOne({ email: email });
      if (!customer) {
        return res.status(400).json({ message: "Email tidak terdaftar" });
      }

      const checkPassword = bcrypt.compareSync(password, customer.password);
      if (!checkPassword) {
        return res.status(400).json({ message: "Password tidak sesuai" });
      }

      // Set expiration time (2 hours in this case)
      const expiresIn = 2 * 60 * 60; // 2 hours in seconds

      // Create JWT with expiration time
      const token = jwt.sign(
        { _id: customer._id, email: customer.email },
        process.env.CUSTOMER_KEY,
        { expiresIn: expiresIn }
      );

      res.status(200).header("Authorization", token).json({
        token: token,
      });
    } catch (error) {
      next(error);
    }
  },
  getProfile: async (req, res, next) => {
    try {
      const customerId = req.customer._id;
      const profile = await Customer.findById(customerId);

      if (!profile) {
        return res.status(404).json({
          message: "Profile tidak ditemukan",
        });
      } else {
        res.status(200).json({
          message: "Berhasil mendapatkan profile",
          data: profile,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getCustomer: async (req, res, next) => {
    try {
      const customers = await Customer.find({});

      if (!customers || customers.length === 0) {
        return res.status(404).json({
          message: "Customer masih kosong",
        });
      }

      res.status(200).json({
        message: "Berhasil mengambil semua customer",
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  },
  getOneCustomer: async (req, res, next) => {
    try {
      const { customerId } = req.params;

      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({
          message: "Customer tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Berhasil mendapatkan customer sesuai ID",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  },
  editCustomer: async (req, res, next) => {
    try {
      const customerId = req.customer._id;
      const { password, ...data } = req.body;

      // Hash password hanya jika ada password baru
      const hashedPassword = password
        ? bcrypt.hashSync(password, 12)
        : undefined;

      // Jika hashedPassword tidak undefined, set data.password menjadi hashedPassword
      if (hashedPassword !== undefined) {
        data.password = hashedPassword;
      }

      const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        data,
        {
          new: true,
        }
      );

      if (!updatedCustomer) {
        return res.status(400).json({
          message: "Gagal mendupdate cusomter",
        });
      }

      res.status(200).json({
        message: "Berhasil mengupdate customer",
        data: updatedCustomer,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteOneCustomer: async (req, res, next) => {
    try {
      const { customerId } = req.params;

      const deletedCusomter = await Customer.findByIdAndDelete(customerId);

      if (!deletedCusomter) {
        res.status(404).json({
          message: "Customer tidak di temukan",
        });
      }

      res.status(201).json({
        message: "Berhasil menghapus customer",
        data: deletedCusomter,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteCustomer: async (req, res, next) => {
    try {
      const deleteAllCustomer = await Customer.deleteMany({});

      if (deleteAllCustomer.deletedCount === 0) {
        return res.status(404).json({
          message: "Tidak ada customer yang dihapus, data masih kosong",
        });
      }

      res.status(200).json({
        message: "Berhasil menghapus semua customer",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = { customerController };
