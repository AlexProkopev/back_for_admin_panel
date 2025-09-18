const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/", checkRole([role.manager, role.owner, role.chef]), ingredientController.getAllIngredients);
router.get("/:id", checkRole([role.manager, role.owner, role.chef]), ingredientController.getIngredientById);
router.post("/", checkRole([role.manager, role.owner, role.chef]), ingredientController.createIngredient);
router.patch("/:id", checkRole([role.manager, role.owner, role.chef]), ingredientController.updateIngredient);
router.delete("/:id", checkRole([role.manager, role.owner, role.chef]), ingredientController.deleteIngredient);

module.exports = router;
