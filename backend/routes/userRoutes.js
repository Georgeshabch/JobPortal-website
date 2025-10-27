const express = require("express");
const {
    updateProfile,
    deteleResume,
    getPublicProfile,
} = require("../Controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected routes
router.put("/profile" , protect , updateProfile);
router.post("/resume" , protect , deteleResume);

// Public route
router.get("/:id" , getPublicProfile);

module.exports = router ;