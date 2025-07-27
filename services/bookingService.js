const Booking = require("../models/booking");

function createBooking(data) {
  return Booking.create(data);
}

function getAllBookings() {
  return Booking.find().sort({ createdAt: 1 });
}

function deleteBooking(id) {
  return Booking.findByIdAndDelete(id);
}

function updateBooking(id, data) {
  return Booking.findByIdAndUpdate(id, data, { new: true });
}

function getBookingById(id) {
  return Booking.findById(id);
}


module.exports = {
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
  getBookingById
};
