const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/",  guestController.getAllGuests);
router.post("/", guestController.createGuest);
router.patch("/:id",checkRole([role.owner, role.manager, role.admin, role.chef, role.officiant, role.bartender]), guestController.updateGuest);
router.delete("/:id",checkRole([role.owner, role.manager, role.admin, role.chef, role.officiant, role.bartender]), guestController.deleteGuest);

module.exports = router;
