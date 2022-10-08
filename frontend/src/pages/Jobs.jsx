import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import JobItem from "../components/JobItem";
import { getJobs, reset } from "../features/jobs/jobSlice";

const Jobs = () => {
    const { jobs, isLoading, isSuccess } = useSelector((state) => state.jobs);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);

    // const handlepagination = async () => {

    // };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <BackButton url="/" />

            <h1>Jobs</h1>
            <div className="jobs">
                <div className="job-headings">
                    <div>Date</div>
                    <div>File</div>
                    <div>Customer</div>
                    <div>Cammer</div>
                    <div>Status</div>
                </div>
                {jobs ? (
                    jobs.map((job) => <JobItem key={job._id} job={job} />)
                ) : (
                    <p>No jobs currently available</p>
                )}
            </div>
            {/* <button className="btn" onClick={handlepagination}>
                More
            </button> */}
        </>
    );
};

export default Jobs;
