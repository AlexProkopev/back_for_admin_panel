const mongoose = require("mongoose");


const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    percent: { type: Number, default: 0 },
    category: { type: String },
    isAvailable: { type: Boolean, default: true },
    ingredients: [
      {
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dish", dishSchema);
