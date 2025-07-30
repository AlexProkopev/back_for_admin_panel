const Visit = require("../models/visits");

function createVisit(data) {
  return Visit.create(data);
}

function getAllVisits() {
  return Visit.find().sort({ createdAt: 1 });
}

function deleteVisit(id) {
  return Visit.findByIdAndDelete(id);
}

function updateVisit(id, data) {
  return Visit.findByIdAndUpdate(id, data, { new: true });
}

function getVisitById(id) {
  return Visit.findById(id);
}


module.exports = {
  createVisit,
  getAllVisits,
  deleteVisit,
  updateVisit,
  getVisitById
};
