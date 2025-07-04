const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  visitCount: { type: Number, default: 0 },
  vipStatus: { type: Boolean, default: false },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Guest", guestSchema);
