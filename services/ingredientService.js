const Ingredient = require("../models/ingredient");

const createIngredient = async (data) => {
  try {
    const ingredient = new Ingredient(data);
    await ingredient.save();
    return ingredient;
  } catch (error) {
    throw error;
  }
};

const getAllIngredients = async () => {
  try {
    return await Ingredient.find();
  } catch (error) {
    throw error;
  }
};

const getIngredientById = async (id) => {
  try {
    return await Ingredient.findById(id);
  } catch (error) {
    throw error;
  }
};

const updateIngredient = async (id, data) => {
  try {
    return await Ingredient.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw error;
  }
};

const deleteIngredient = async (id) => {
  try {
    return await Ingredient.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
};
