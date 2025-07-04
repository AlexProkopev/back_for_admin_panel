const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/",checkRole([role.admin, role.manager,role.waiter]), controller.getAllBookings);
router.post("/",checkRole([role.admin, role.manager,role.waiter]), controller.createBooking);
router.get("/:bookingId",checkRole([role.admin, role.manager,role.waiter]), controller.getBookingById);
router.patch("/:bookingId",checkRole([role.admin, role.manager,role.waiter]), controller.updateBooking);
router.delete("/:bookingId",checkRole([role.admin, role.manager,role.waiter]), controller.deleteBooking);

module.exports = router;