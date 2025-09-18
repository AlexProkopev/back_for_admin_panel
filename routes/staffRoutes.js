const express = require("express");
const router = express.Router();
const controller = require("../controllers/staffController");

const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");


router.post("/", controller.create);
router.get("/",checkRole([role.admin, role.manager,role.owner]), controller.getAll);
router.patch("/:staffId",checkRole([role.admin, role.manager,role.owner]), controller.update);
router.delete("/:staffId",checkRole([role.admin, role.manager,role.owner]), controller.remove);

module.exports = router;
