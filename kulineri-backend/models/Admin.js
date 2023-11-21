const mongoose = require("mongoose");
const { generateImage } = require("../utils/helper");
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageProfile: String,
  },
  { timestamps: true }
);

// Middleware pre-save untuk mengisi nilai imageProfile sebelum disimpan
adminSchema.pre("save", function (next) {
  // Cek apakah imageProfile sudah diisi atau belum
  if (!this.imageProfile) {
    // Jika belum, isi dengan hasil dari fungsi helper
    this.imageProfile = generateImage(this.name);
  }
  next();
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
