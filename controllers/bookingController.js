const bookingService = require("../services/bookingService");
const tableService = require("../services/tableService");
const Table = require("../models/table");
function getAllBookings(req, res) {
  bookingService
    .getAllBookings()
    .then((bookings) => res.json(bookings))
    .catch(() =>
      res.status(500).json({ message: "Ошибка при получении бронирований" })
    );
}

async function createBooking(req, res) {
  const { name, phone, date, guests, notes, table } = req.body;

  if (!name || !phone || !date || !guests || !table) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, заполните все обязательные поля" });
  }

  try {
    const selectedTable = await Table.findById(table);
    if (!selectedTable) {
      return res.status(404).json({ message: "Стол не найден" });
    }
    if (selectedTable.isOccupied) {
      return res.status(400).json({ message: "Этот стол уже занят" });
    }
    const booking = await bookingService.createBooking({
      name,
      phone,
      date,
      guests,
      notes,
      table,
    });
    selectedTable.isOccupied = true;
    await selectedTable.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteBooking(req, res) {
  try {
    const { bookingId } = req.params;
    const currentBooking = await bookingService.getBookingById(bookingId);
    if (!currentBooking) {
      return res.status(404).json({ message: "Бронирование не найдено" });
    }
    const tableId = currentBooking.table._id;
    await tableService.updateAvailability(tableId, false);
    await bookingService.deleteBooking(bookingId);

    res.json({ message: "Бронирование удалено" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Что-то пошло не так" });
  }
}

function updateBooking(req, res) {
  const { bookingId } = req.params;
  const updateData = req.body;
  bookingService
    .updateBooking(bookingId, updateData)
    .then((updated) => res.json(updated))
    .catch((err) => res.status(500).json({ message: err.message }));
}

function getBookingById(req, res) {
  const { bookingId } = req.params;

  bookingService
    .getBookingById(bookingId)
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({ message: "Бронирование не найдено" });
      }
      res.json(booking);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
}

module.exports = {
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
  getBookingById,
};
