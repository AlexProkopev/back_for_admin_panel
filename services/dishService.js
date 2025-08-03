const Dish = require("../models/dish");
const ingredientService = require("./ingredientService");

function createDish(data) {
  return Dish.create(data);
}

function getAllDishes() {
  return Dish.find().populate("ingredients.ingredient").sort({ createdAt: 1 });
}

function getDishById(id) {
  return Dish.findById(id).populate("ingredients.ingredient");
}

function updateDish(id, data) {
  return Dish.findByIdAndUpdate(id, data, { new: true });
}

function deleteDish(id) {
  return Dish.findByIdAndDelete(id);
}

async function handleDishCreation({ name, percent, category, isAvailable, ingredients, photo }) {
  
  if (!name || !category || !ingredients || !Array.isArray(ingredients)) {
    
    throw new Error("Пожалуйста, заполните все обязательные поля");
  }

  const isAvailableName = await Dish.findOne({name})
  if (isAvailableName) throw new Error("Такое блюдо уже есть");
  

  let totalPrice = 0;
  let totalWeight = 0;

  for (const { ingredient: id, quantity } of ingredients) {
    const ingredient = await ingredientService.getIngredientById(id);
    if (!ingredient) throw new Error(`Ингредиент с ID ${id} не найден`);
    if (ingredient.stock < quantity) {
      throw new Error(`Недостаточно "${ingredient.name}" на складе`);
    }

    totalPrice += ingredient.costPerUnit * quantity;
    totalWeight += quantity;
  }

  if (percent > 0) {
    totalPrice += totalPrice * (percent / 100);
  }
  

  for (const { ingredient: id, quantity } of ingredients) {
    const ingredient = await ingredientService.getIngredientById(id);
    ingredient.stock -= quantity;
    await ingredient.save();
  }

   const newDish = await Dish.create({
    name,
    category,
    isAvailable,
    percent,
    price: totalPrice,
    weight: totalWeight,
    ingredients,
    photo, 
  });

  return newDish;
}

module.exports = {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
  handleDishCreation,
};
