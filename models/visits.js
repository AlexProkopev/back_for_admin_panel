const mongoose = require("mongoose");

const visitsSchema = new mongoose.Schema(
  {
    phone: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    lastVisit: {type: Date, required: true},
    countVisit: {type: Number, default: 0}
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", visitsSchema);
module.exports = Visit;
