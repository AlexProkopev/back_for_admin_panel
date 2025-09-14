const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["officiant", "cook", "administrator", "cleaning", "bartender", "manager", "owner", "security"],
      default: "officiant",
    },
    refreshToken: { type: String },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
    notes: { type: String },
    shifts: [Date]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
