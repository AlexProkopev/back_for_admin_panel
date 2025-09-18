const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get(
  "/",
  checkRole([
    role.owner,
    role.manager,
    role.waiter,
    role.admin,
    role.chef,
    role.bartender,
  ]),
  controller.getAllBookings
);
router.post(
  "/",
  checkRole([
    role.owner,
    role.manager,
    role.waiter,
    role.admin,
    role.chef,
    role.bartender,
  ]),
  controller.createBooking
);
router.get(
  "/:bookingId",
  checkRole([
    role.owner,
    role.manager,
    role.waiter,
    role.admin,
    role.chef,
    role.bartender,
  ]),
  controller.getBookingById
);
router.patch(
  "/:bookingId",
  checkRole([
    role.owner,
    role.manager,
    role.waiter,
    role.admin,
    role.chef,
    role.bartender,
  ]),
  controller.updateBooking
);
router.delete(
  "/:bookingId",
  checkRole([
    role.owner,
    role.manager,
    role.waiter,
    role.admin,
    role.chef,
    role.bartender,
  ]),
  controller.deleteBooking
);

module.exports = router;
