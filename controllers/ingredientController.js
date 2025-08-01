const ingredientService = require("../services/ingredientService");

async function getAllIngredients(req, res) {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении ингредиентов" });
  }
}

async function createIngredient(req, res) {
  const data = req.body;

  if (!data.name || !data.costPerUnit) {
    return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля" });
  }

  try {
    const convertedData = {
      ...data,
      costPerUnit: Number(data.costPerUnit) / 1000,
      unit: 'гр',
    };

    const ingredient = await ingredientService.createIngredient(convertedData);
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getIngredientById(req, res) {
  const { id } = req.params;

  try {
    const ingredient = await ingredientService.getIngredientById(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ингредиент не найден" });
    }
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateIngredient(req, res) {
  const { id } = req.params;
  const data = req.body;

  try {
    const ingredient = await ingredientService.updateIngredient(id, data);
    if (!ingredient) {
      return res.status(404).json({ message: "Ингредиент не найден" });
    }
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteIngredient(req, res) {
  const { id } = req.params;

  try {
    const ingredient = await ingredientService.deleteIngredient(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ингредиент не найден" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getAllIngredients,
  createIngredient,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
};
