const express = require("express");
const router = express.Router();
const { getEmployerAnalytics } = require("../Controllers/analyticsController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/overview", protect , getEmployerAnalytics);

module.exports = router;