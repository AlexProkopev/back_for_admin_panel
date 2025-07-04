const express = require("express");
const router = express.Router();


const bookingRoutes = require("./bookingRoutes");
const tableRoutes = require("./tableRoutes");
const staffRoutes = require("./staffRoutes");
const guestRoutes = require("./guestRoutes");
const reviewRoutes = require("./reviewRoutes");
const dishRoutes = require("./dishRoutes");
const stockRoutes = require("./stockRoutes");
const statisticsRoutes = require("./statisticsRoutes");



router.use("/bookings", bookingRoutes);
router.use("/table", tableRoutes);
router.use("/staff", staffRoutes);
router.use("/guests", guestRoutes);
router.use("/reviews", reviewRoutes);
router.use("/dishes", dishRoutes);
router.use("/stock", stockRoutes);
router.use("/statistics", statisticsRoutes);

module.exports = router;