const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Job = require("../models/jobModel");

//@desc Get jobs
//@route GET/api/jobs
//@access Private
const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find()
    .sort({ $natural: -1 });

    // const options = {
    //     page: 1,
    //     limit: 3,
    //     sort: { $natural: -1 },
    // };

    // const jobs = await Job.paginate({}, options);

    res.status(200).json(jobs);
});

//@desc Get job
//@route GET/api/jobs/:id
//@access Private
const getJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }

    res.status(200).json(job);
});

//@desc Create job
//@route POST /api/jobs
//@access Private
const createJob = asyncHandler(async (req, res) => {
    const { file, customer, ref, board, panel, thickness, sales } = req.body;

    if (!file || !customer || !ref || !panel) {
        res.status(400);
        throw new Error("Please fill in required fields");
    }

    //Get user using id and jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const job = await Job.create({
        file,
        cammer: req.user.name,
        customer,
        ref,
        board,
        panel,
        thickness,
        sales,
        user: req.user.id,
        status: "new",
    });

    res.status(201).json(job);
});

//@desc Delete job
//@route DELETE/api/job/:id
//@access Private
const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }

    await job.remove();

    res.status(200).json({ success: true });
});

//@desc Update job
//@route PUT /api/job/:id
//@access Private
const updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedJob);
});

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
