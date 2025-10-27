const express = require("express");
const {
    createJob,
    getJobs,
    getJobById,
    uploadJob,
    deleteJob,
    toggleCloseJob,
    getJobsEmployer,
} = require("../Controllers/jobController");
const { protect } = require("../middlewares/authMiddleware");


const router = express.Router();

router.route("/").post(protect , createJob).get(getJobs);
router.route("/get-jobs-employer").get(protect , getJobsEmployer);
router.route("/:id").get(getJobById).put(protect , uploadJob).delete(protect , deleteJob);
router.put("/:id/toggle-close" , protect , toggleCloseJob);

module.exports = router;