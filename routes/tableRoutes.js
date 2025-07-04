const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");


router.get("/", tableController.getAllTables);
router.post("/",checkRole([role.admin, role.manager]), tableController.createTable);
router.patch("/:tableId",checkRole([role.admin, role.manager]),  tableController.updateAvailability);

module.exports = router;
