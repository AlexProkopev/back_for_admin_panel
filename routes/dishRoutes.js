const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");
const { createDishWithUpload } = require("../controllers/dishController");

router.get("/", dishController.getAllDishes);
router.get("/:id", dishController.getDishById);
router.patch(
  "/:id",
  checkRole([role.owner, role.manager, role.admin, role.chef]),
  dishController.updateDish
);
router.post(
  "/",
  checkRole([role.owner, role.manager, role.chef]),
  createDishWithUpload
);
router.delete(
  "/:id",
  checkRole([role.owner, role.manager, role.chef]),
  dishController.deleteDish
);

module.exports = router;
