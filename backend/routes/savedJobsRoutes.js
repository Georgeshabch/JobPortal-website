const express = require("express");
const {
    saveJob,
    unsaveJob,
    getMySavedJobs,
} = require("../Controllers/savedJobsController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:jobId" , protect , saveJob);
router.delete("/:jobId" , protect , unsaveJob);
router.get("/my" , protect , getMySavedJobs);

module.exports = router;