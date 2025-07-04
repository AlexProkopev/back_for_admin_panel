const bookingService = require("../services/bookingService");

function getAllBookings(req, res) {
  bookingService.getAllBookings()
    .then(bookings => res.json(bookings))
    .catch(error => res.status(500).json({ message: "Ошибка при получении бронирований" }));
}

function createBooking(req, res) {
  const { name, phone, date, guests, notes } = req.body;

  if (!name || !phone || !date || !guests) {
    return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля" });
  }

  bookingService.createBooking({ name, phone, date, guests, notes })
    .then(booking => res.status(201).json(booking))
    .catch(err => res.status(500).json({ message: err.message }));
}

function deleteBooking(req, res) {
  const { bookingId } = req.params;
console.log(bookingId)
  bookingService.deleteBooking(bookingId)
    .then(() => res.json({ message: "Бронирование удалено" }))
    .catch(err => res.status(500).json({ message: err.message }));
}

function updateBooking(req, res) {
  const { bookingId } = req.params;
  const updateData = req.body;
console.log(updateData)
  bookingService.updateBooking(bookingId, updateData)
    .then(updated => res.json(updated))
    .catch(err => res.status(500).json({ message: err.message }));
}

function getBookingById(req, res) {
  const { bookingId } = req.params;

  bookingService.getBookingById(bookingId)
    .then(booking => {
      if (!booking) {
        return res.status(404).json({ message: "Бронирование не найдено" });
      }
      res.json(booking);
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

module.exports = {
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
  getBookingById
};
