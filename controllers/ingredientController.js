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
    const hasStock = data.stock !== undefined;
    const parsedStock = hasStock ? Number(data.stock) : null;

    if (hasStock && isNaN(parsedStock)) {
      return res.status(400).json({ message: "Некорректное значение stock" });
    }

    if (hasStock && data.mode === 'set') {
      delete data.mode;
      data.stock = parsedStock;
      const updatedIngredient = await ingredientService.updateIngredient(id, data);
      if (!updatedIngredient) {
        return res.status(404).json({ message: "Ингредиент не найден" });
      }
      return res.json(updatedIngredient);
    }

    if (hasStock) {
      await ingredientService.updateIngredient(id, {
        $inc: { stock: parsedStock },
      });
      delete data.stock;
    }

    let updatedIngredient = null;

    if (Object.keys(data).length > 0) {
      updatedIngredient = await ingredientService.updateIngredient(id, data);
    } else {
      updatedIngredient = await ingredientService.getIngredientById(id);
    }

    if (!updatedIngredient) {
      return res.status(404).json({ message: "Ингредиент не найден" });
    }

    return res.json(updatedIngredient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
