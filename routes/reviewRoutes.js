const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const checkRole = require("../middleware/checkRole");
const { role } = require("../scripts/role");


router.get("/", reviewController.getAllReviews);
router.post("/", reviewController.createReview);
router.patch("/:id",checkRole([role.admin, role.manager, role.owner]), reviewController.updateReview);
router.delete("/:id",checkRole([role.admin, role.manager, role.owner]), reviewController.deleteReview);

module.exports = router;
