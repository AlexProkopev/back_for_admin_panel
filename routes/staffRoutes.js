const express = require("express");
const router = express.Router();
const controller = require("../controllers/staffController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.use(auth);

router.post("/",checkRole([role.admin, role.manager]), controller.create);
router.get("/",checkRole([role.admin, role.manager]), controller.getAll);
router.patch("/:staffId",checkRole([role.admin, role.manager]), controller.update);
router.delete("/:staffId",checkRole([role.admin, role.manager]), controller.remove);

module.exports = router;
