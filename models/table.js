const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    seats: { type: Number, required: true },
    location: { type: String, default: "Зал" },
    isOccupied: { type: Boolean, default: false },
    bookingDate: {type: [{date: Date,name: String,phone: String, bookingId: mongoose.Schema.Types.ObjectId,},],default: [],},
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
