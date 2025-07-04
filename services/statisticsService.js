const Booking = require("../models/booking");
const Stock = require("../models/stock");
const Review = require("../models/review");

function getBookingCountByDay() {
  return Booking.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
}

function getLowStockItems() {
  return Stock.find({ quantity: { $lt: 5 } });
}

function getAverageRatings() {
  return Review.aggregate([
    {
      $group: {
        _id: "$dishId",
        avgRating: { $avg: "$rating" },
        total: { $sum: 1 }
      }
    }
  ]);
}

module.exports = {
  getBookingCountByDay,
  getLowStockItems,
  getAverageRatings,
};
