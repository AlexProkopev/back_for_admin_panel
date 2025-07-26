const tableService = require("../services/tableService");
const Table = require("../models/table");

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

async function updateAvailability(tableId, isOccupied) {
  return Table.findByIdAndUpdate(
    tableId,
    { isOccupied },
    { new: true }
  );
}

async function deleteTable(req, res) {
  try {
    const { tableId } = req.params;
    await tableService.deleteTable(tableId);

    res.json({ message: "Стол удален" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Что-то пошло не так" });
  }
}
module.exports = {
  createTable,
  getAllTables,
  updateAvailability,
  deleteTable
};
