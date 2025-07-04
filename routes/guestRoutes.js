const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/", guestController.getAllGuests);
router.post("/", guestController.createGuest);
router.patch("/:id",checkRole([role.admin, role.manager]), guestController.updateGuest);
router.delete("/:id",checkRole([role.admin, role.manager]), guestController.deleteGuest);

module.exports = router;
