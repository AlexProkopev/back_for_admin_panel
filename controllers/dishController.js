const dishService = require("../services/dishService");
const upload = require("../middleware/multer");

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
    const photoUrl = req.file?.path;

    const {
      name,
      category,
      percent,
      isAvailable,
      ingredients,
    } = req.body;


    const parsedIngredients = JSON.parse(ingredients);
    const parsedPercent = Number(percent);
    const parsedIsAvailable = isAvailable === 'true';

    const newDish = await dishService.handleDishCreation({
      name,
      category,
      percent: parsedPercent,
      isAvailable: parsedIsAvailable,
      ingredients: parsedIngredients,
      photo: photoUrl,
    });


    res.status(201).json(newDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const createDishWithUpload = [upload.single("photo"), createDish];

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
  createDishWithUpload,
  updateDish,
  deleteDish,
};
