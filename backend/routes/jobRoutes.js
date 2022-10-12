const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");

router.route("/").get(protect, getJobs).post(protect, createJob);

router
    .route("/:id")
    .get(protect, getJob)
    .delete(protect, deleteJob)
    .put(protect, updateJob);

module.exports = router;
