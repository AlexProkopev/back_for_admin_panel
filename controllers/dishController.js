const dishService = require("../services/dishService");

async function getAllDishes(req, res) {
  try {
    const dishes = await dishService.getAllDishes();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении блюд" });
  }
}

async function createDish(req, res) {
  try {
    const newDish = await dishService.handleDishCreation(req.body);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getDishById(req, res) {
  try {
    const dish = await dishService.getDishById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Блюдо не найдено" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateDish(req, res) {
  try {
    const dish = await dishService.updateDish(req.params.id, req.body);
    if (!dish) return res.status(404).json({ message: "Блюдо не найдено" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteDish(req, res) {
  try {
    const dish = await dishService.deleteDish(req.params.id);
    if (!dish) return res.status(404).json({ message: "Блюдо не найдено" });
    res.json({ message: "Блюдо удалено" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
};
