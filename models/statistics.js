const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    revenue: { type: Number, required: true },
    expenses: { type: Number, required: true },
    profit: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Statistics", staffSchema);
