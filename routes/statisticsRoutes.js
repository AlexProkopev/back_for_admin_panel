const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");

router.get("/bookings/daily-count", statisticsController.getBookingCountByDay);
router.get("/stock/low", statisticsController.getLowStockItems);
router.get("/reviews/average-rating", statisticsController.getAverageRatings);

module.exports = router;
