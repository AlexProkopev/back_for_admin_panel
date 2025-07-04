const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date: { type: Date, default: Date.now },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
