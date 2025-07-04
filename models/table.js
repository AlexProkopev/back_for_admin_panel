const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    seats: { type: Number, required: true },
    location: { type: String, default: "Зал" },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
