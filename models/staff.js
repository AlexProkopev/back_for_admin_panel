const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["официант", "повар", "администратор", "уборка", "бармен"],
      default: "официант",
    },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
    notes: { type: String },
    shifts: [Date]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
