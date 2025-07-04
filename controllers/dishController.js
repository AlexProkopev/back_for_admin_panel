const dishService = require("../services/dishService");

function getAllDishes(req, res) {
  dishService.getAllDishes()
    .then(dishes => res.json(dishes))
    .catch(() => res.status(500).json({ message: "Ошибка при получении меню" }));
}

function createDish(req, res) {
  const { name, description, price, weight, category, available } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Название и цена обязательны" });
  }

  dishService.createDish({ name, description, price, weight, category, available })
    .then(dish => res.status(201).json(dish))
    .catch(err => res.status(500).json({ message: err.message }));
}

function updateDish(req, res) {
  const { id } = req.params;
  const data = req.body;

  dishService.updateDish(id, data)
    .then(updated => {
      if (!updated) return res.status(404).json({ message: "Блюдо не найдено" });
      res.json(updated);
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

function deleteDish(req, res) {
  const { id } = req.params;

  dishService.deleteDish(id)
    .then(() => res.json({ message: "Блюдо удалено" }))
    .catch(err => res.status(500).json({ message: err.message }));
}

module.exports = {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
};
