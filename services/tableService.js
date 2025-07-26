const Table = require("../models/table");

function createTable(data) {
  return Table.create(data);
}

function getAllTables() {
  return Table.find();
}

function updateAvailability(id, isOccupied) {
  return Table.findByIdAndUpdate(id, { isOccupied }, { new: true });
}

function deleteTable(id) {
  return Table.findByIdAndDelete(id);
}

module.exports = {
  createTable,
  getAllTables,
  updateAvailability,
  deleteTable
};
