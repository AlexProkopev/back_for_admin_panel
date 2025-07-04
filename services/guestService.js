const Guest = require("../models/guest");

function createGuest(data) {
  return Guest.create(data);
}

function getAllGuests() {
  return Guest.find();
}

function updateGuest(id, data) {
  return Guest.findByIdAndUpdate(id, data, { new: true });
}

function deleteGuest(id) {
  return Guest.findByIdAndDelete(id);
}

module.exports = {
  createGuest,
  getAllGuests,
  updateGuest,
  deleteGuest,
};
