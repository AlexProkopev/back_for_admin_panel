const reviewService = require("../services/reviewService");

function getAllReviews(req, res) {
  reviewService.getAllReviews()
    .then(reviews => res.json(reviews))
    .catch(() => res.status(500).json({ message: "Ошибка при получении отзывов" }));
}

function createReview(req, res) {
  const { guestName, rating, comment, bookingId } = req.body;

  if (!guestName || !rating) {
    return res.status(400).json({ message: "Имя гостя и рейтинг обязательны" });
  }

  reviewService.createReview({ guestName, rating, comment, bookingId })
    .then(review => res.status(201).json(review))
    .catch(err => res.status(500).json({ message: err.message }));
}

function updateReview(req, res) {
  const { id } = req.params;
  const data = req.body;

  reviewService.updateReview(id, data)
    .then(updated => {
      if (!updated) return res.status(404).json({ message: "Отзыв не найден" });
      res.json(updated);
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

function deleteReview(req, res) {
  const { id } = req.params;

  reviewService.deleteReview(id)
    .then(() => res.json({ message: "Отзыв удалён" }))
    .catch(err => res.status(500).json({ message: err.message }));
}

module.exports = {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
};
