const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    name: String,
    values: [String],
  },
  { _id: false }
);

const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    weight: { type: Number },
    category: { type: String },
    available: { type: Boolean, default: true },
    ingredients: [String],
    options: [optionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dish", dishSchema);
