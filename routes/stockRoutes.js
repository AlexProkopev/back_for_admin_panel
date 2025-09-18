const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/", checkRole([role.manager, role.owner, role.chef]), stockController.getAllStockItems);
router.post("/", checkRole([role.manager, role.owner, role.chef]), stockController.createStockItem);
router.patch("/:id", checkRole([role.manager, role.owner, role.chef]), stockController.updateStockItem);
router.delete("/:id", checkRole([role.manager, role.owner, role.chef]), stockController.deleteStockItem);

module.exports = router;
