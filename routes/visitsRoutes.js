const express = require("express");
const router = express.Router();
const visitController = require("../controllers/visitController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/", visitController.getAllGuests);
router.post("/", checkRole([role.admin, role.manager]), visitController.createGuest);
router.get("/:guestId", checkRole([role.admin, role.manager]), visitController.getGuestById);
router.patch("/:guestId", checkRole([role.admin, role.manager]), visitController.guestUpdate);
router.delete("/:guestId", checkRole([role.admin, role.manager]), visitController.deleteGuest);

module.exports = router;