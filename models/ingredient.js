const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, default: "гр" },
    costPerUnit: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ingredient", ingredientSchema);
