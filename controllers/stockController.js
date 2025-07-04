const stockService = require("../services/stockService");

function getAllStockItems(req, res) {
  stockService.getAllStockItems()
    .then(items => res.json(items))
    .catch(() => res.status(500).json({ message: "Ошибка при получении склада" }));
}

function createStockItem(req, res) {
  const { name, quantity, unit, pricePerUnit, supplier, lastDeliveryDate, notes } = req.body;

  if (!name || !quantity || !unit) {
    return res.status(400).json({ message: "Обязательные поля: name, quantity, unit" });
  }

  stockService.createStockItem({ name, quantity, unit, pricePerUnit, supplier, lastDeliveryDate, notes })
    .then(item => res.status(201).json(item))
    .catch(err => res.status(500).json({ message: err.message }));
}

function updateStockItem(req, res) {
  const { id } = req.params;
  stockService.updateStockItem(id, req.body)
    .then(updated => {
      if (!updated) return res.status(404).json({ message: "Не найдено" });
      res.json(updated);
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

function deleteStockItem(req, res) {
  const { id } = req.params;
  stockService.deleteStockItem(id)
    .then(() => res.json({ message: "Удалено" }))
    .catch(err => res.status(500).json({ message: err.message }));
}

module.exports = {
  getAllStockItems,
  createStockItem,
  updateStockItem,
  deleteStockItem
};
