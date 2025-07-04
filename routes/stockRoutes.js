const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");


router.get("/", stockController.getAllStockItems);
router.post("/", stockController.createStockItem);
router.patch("/:id", stockController.updateStockItem);
router.delete("/:id", stockController.deleteStockItem);

module.exports = router;
