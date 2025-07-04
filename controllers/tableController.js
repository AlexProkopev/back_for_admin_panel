const tableService = require("../services/tableService");

function createTable(req, res) {
  const { number, seats, location } = req.body;

  if (!number || !seats) {
    return res.status(400).json({ message: "Номер и места обязательны" });
  }

  tableService.createTable({ number, seats, location })
    .then((table) => res.status(201).json(table))
    .catch((err) => res.status(500).json({ message: err.message }));
}

function getAllTables(req, res) {
  tableService.getAllTables()
    .then((tables) => res.json(tables))
    .catch((err) => res.status(500).json({ message: err.message }));
}

function updateAvailability(req, res) {
  const { tableId } = req.params;
  const { isAvailable } = req.body;

  tableService.updateAvailability(tableId, isAvailable)
    .then((table) => res.json(table))
    .catch((err) => res.status(500).json({ message: err.message }));
}

module.exports = {
  createTable,
  getAllTables,
  updateAvailability,
};
