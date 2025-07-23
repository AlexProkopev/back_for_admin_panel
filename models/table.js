const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    seats: { type: Number, required: true },
    location: { type: String, default: "Зал" },
    isOccupied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
