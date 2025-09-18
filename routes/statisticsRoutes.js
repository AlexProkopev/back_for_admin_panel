const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");

router.get("/bookings/daily-count", checkRole([role.manager, role.owner]), statisticsController.getBookingCountByDay);
router.get("/stock/low", checkRole([role.manager, role.owner]), statisticsController.getLowStockItems);
router.get("/reviews/average-rating", checkRole([role.manager, role.owner]), statisticsController.getAverageRatings);

module.exports = router;
