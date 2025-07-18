
const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/", dishController.getAllDishes);
router.post("/",checkRole([role.admin, role.manager,role.chef]), dishController.createDish);
router.patch("/:id",checkRole([role.admin, role.manager,role.chef]), dishController.updateDish);
router.delete("/:id",checkRole([role.admin, role.manager, role.chef]), dishController.deleteDish);

module.exports = router;
