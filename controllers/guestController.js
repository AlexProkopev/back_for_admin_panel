const guestService = require("../services/guestService");

function getAllGuests(req, res) {
  guestService.getAllGuests()
    .then(guests => res.json(guests))
    .catch(() => res.status(500).json({ message: "Ошибка при получении гостей" }));
}

function createGuest(req, res) {
  const { name, phone, email, vipStatus, notes } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Имя обязательно" });
  }

  guestService.createGuest({ name, phone, email, vipStatus, notes })
    .then(guest => res.status(201).json(guest))
    .catch(err => res.status(500).json({ message: err.message }));
}

function updateGuest(req, res) {
  const { id } = req.params;
  const data = req.body;

  guestService.updateGuest(id, data)
    .then(updated => {
      if (!updated) return res.status(404).json({ message: "Гость не найден" });
      res.json(updated);
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

function deleteGuest(req, res) {
  const { id } = req.params;

  guestService.deleteGuest(id)
    .then(() => res.json({ message: "Гость удалён" }))
    .catch(err => res.status(500).json({ message: err.message }));
}

module.exports = {
  getAllGuests,
  createGuest,
  updateGuest,
  deleteGuest,
};
