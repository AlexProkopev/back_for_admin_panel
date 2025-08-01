const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/", ingredientController.getAllIngredients);
router.get("/:id", ingredientController.getIngredientById);
router.post("/", checkRole([role.admin, role.manager]), ingredientController.createIngredient);
router.patch("/:id", checkRole([role.admin, role.manager]), ingredientController.updateIngredient);
router.delete("/:id", checkRole([role.admin, role.manager]), ingredientController.deleteIngredient);

module.exports = router;
