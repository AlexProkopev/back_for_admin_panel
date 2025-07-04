const mongoose = require("mongoose");

const stockItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  pricePerUnit: { type: Number },
  supplier: { type: String },
  lastDeliveryDate: { type: Date, default: Date.now },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("StockItem", stockItemSchema);
