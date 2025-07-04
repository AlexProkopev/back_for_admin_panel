const mongoose = require("mongoose");
const { role } = require("../scripts/role");
const { admin, chef, waiter, manager, storekeeper } = role;

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [admin, chef, waiter, manager, storekeeper],
      default: waiter,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
