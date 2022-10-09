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

router.route("/").get(getJobs).post(createJob);

router
    .route("/:id")
    .get(getJob)
    .delete(protect, deleteJob)
    .put(updateJob);

module.exports = router;
