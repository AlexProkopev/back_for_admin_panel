const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    guests: { type: Number, required: true },
    name: { type: String, required: true },
    phone:  { type: Number, required: true },
    status: {
      type: String,
      enum: ["ожидаем", "за столом"],
      default: "ожидаем",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
