const Stock = require("../models/stock");

function getAllStockItems() {
  return Stock.find().sort({ createdAt: 1 });
}

function createStockItem(data) {
  return Stock.create(data);
}

function updateStockItem(id, data) {
  return Stock.findByIdAndUpdate(id, data, { new: true });
}

function deleteStockItem(id) {
  return Stock.findByIdAndDelete(id);
}

module.exports = {
  getAllStockItems,
  createStockItem,
  updateStockItem,
  deleteStockItem
};
