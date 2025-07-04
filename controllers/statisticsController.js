const statisticsService = require("../services/statisticsService");

function getBookingCountByDay(req, res) {
  statisticsService.getBookingCountByDay()
    .then(data => res.json(data))
    .catch(() => res.status(500).json({ message: "Ошибка при получении статистики броней" }));
}

function getLowStockItems(req, res) {
  statisticsService.getLowStockItems()
    .then(items => res.json(items))
    .catch(() => res.status(500).json({ message: "Ошибка при получении остатков на складе" }));
}

function getAverageRatings(req, res) {
  statisticsService.getAverageRatings()
    .then(data => res.json(data))
    .catch(() => res.status(500).json({ message: "Ошибка при получении отзывов" }));
}

module.exports = {
  getBookingCountByDay,
  getLowStockItems,
  getAverageRatings
};
