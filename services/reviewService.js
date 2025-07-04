const Review = require("../models/review");

function createReview(data) {
  return Review.create(data);
}

function getAllReviews() {
  return Review.find().sort({ date: -1 });
}

function updateReview(id, data) {
  return Review.findByIdAndUpdate(id, data, { new: true });
}

function deleteReview(id) {
  return Review.findByIdAndDelete(id);
}

module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
