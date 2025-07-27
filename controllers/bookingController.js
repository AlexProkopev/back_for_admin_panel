const bookingService = require("../services/bookingService");
const Table = require("../models/table");
const Booking = require("../models/booking");
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

    const newBookingDate = new Date(date);

    const overlappingBooking = selectedTable.bookingDate.find((b) => {
      const existingDate = new Date(b.date);
      return (
        existingDate.getHours() === newBookingDate.getHours() &&
        existingDate.toDateString() === newBookingDate.toDateString()
      );
    });

    if (overlappingBooking) {
      console.log("Стол уже забронирован на это время");
      return res
        .status(400)
        .json({ message: "Стол уже забронирован на это время" });
    }
    const booking = await bookingService.createBooking({
      name,
      phone,
      date: newBookingDate,
      guests,
      notes,
      table,
    });
    selectedTable.bookingDate.push({
      date: newBookingDate,
      name,
      phone,
      bookingId: booking._id,
    });
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
    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ message: "Стол не найден" });
    }
    table.bookingDate = table.bookingDate.filter(
      (item) => item.bookingId.toString() !== bookingId
    );
    table.isOccupied = false;
    await table.save();
    await bookingService.deleteBooking(bookingId);
    res.json({ message: "Бронирование удалено" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Что-то пошло не так" });
  }
}

async function updateBooking(req, res) {
  try {
    const { bookingId } = req.params;
    const updateData = req.body;
    const currentBooking = await Booking.findById(bookingId);
    if (!currentBooking) {
      return res.status(404).json({ message: "Бронирование не найдено" });
    }

    Object.assign(currentBooking, updateData);
    const updatedBooking = await currentBooking.save();
    const table = await Table.findById(updatedBooking.table);
    table.isOccupied = true;
    if (!table) {
      return res.status(404).json({ message: "Стол не найден" });
    }
    await table.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message || "Что-то пошло не так" });
  }
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
