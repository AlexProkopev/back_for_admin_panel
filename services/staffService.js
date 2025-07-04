const Staff = require("../models/staff");

function createStaff(data) {
  return Staff.create(data);
}

function getAllStaff() {
  return Staff.find();
}

function updateStaff(id, data) {
  return Staff.findByIdAndUpdate(id, data, { new: true });
}

function deleteStaff(id) {
  return Staff.findByIdAndDelete(id);
}

module.exports = {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
};
