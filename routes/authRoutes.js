const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
router.post("/", authController.login);
router.get("/current", auth, authController.getCurrentUser);

module.exports = router;
