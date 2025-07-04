const Table = require("../models/table");

function createTable(data) {
  return Table.create(data);
}

function getAllTables() {
  return Table.find();
}

function updateAvailability(id, isAvailable) {
  return Table.findByIdAndUpdate(id, { isAvailable }, { new: true });
}

module.exports = {
  createTable,
  getAllTables,
  updateAvailability,
};
