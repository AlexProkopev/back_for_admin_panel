const Dish = require("../models/dish");

function createDish(data) {
  return Dish.create(data);
}

function getAllDishes() {
  return Dish.find().sort({ createdAt: 1 });
}

function getDishById(id) {
  return Dish.findById(id);
}

function updateDish(id, data) {
  return Dish.findByIdAndUpdate(id, data, { new: true });
}

function deleteDish(id) {
  return Dish.findByIdAndDelete(id);
}

module.exports = {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
};