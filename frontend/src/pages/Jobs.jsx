import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import JobItem from "../components/JobItem";
import { getJobs, reset } from "../features/jobs/jobSlice";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Jobs = () => {
    const { jobs, isLoading, isSuccess } = useSelector((state) => state.jobs);
    // const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getJobs(page));
    }, [dispatch, page]);

    // const onSearch = (e) => {
    //     e.preventDefault();

    //     const results = jobs.jobs.filter((job) => job.includes(searchText));

    //     console.log(results);
    //     return results
    // };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <BackButton url="/" />
            {/* <form onSubmit={onSearch}>
                <div className="form-group">
                    <input
                        type="text"
                        name="searchText"
                        id="searchText"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search File"
                    />
                </div>
            </form> */}

            <h1>Jobs</h1>
            {jobs.paginationData ? (
                <h3>Total Jobs: {jobs.paginationData.totalResults}</h3>
            ) : (
                <h3>No Jobs </h3>
            )}
            {jobs.paginationData ? (
                <h3 className="open">
                    Open Jobs: {jobs.paginationData.openJobs}
                </h3>
            ) : (
                <h3>No Jobs </h3>
            )}
            <div className="jobs">
                <div className="job-headings">
                    <div>Date</div>
                    <div>File</div>
                    <div>Customer</div>
                    <div>Cammer</div>
                    <div>Status</div>
                </div>
                {jobs.jobs ? (
                    jobs.jobs.map((job) => <JobItem key={job._id} job={job} />)
                ) : (
                    <p>No jobs currently available</p>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setPage((prevState) => prevState - 1)}
                    className={page === 1 ? "btn btn-reverse" : "btn"}
                    disabled={page === 1 ? true : false}
                >
                    <FaArrowCircleLeft /> Prev
                </button>
                <p>
                    {page} of{" "}
                    {jobs.paginationData ? (
                        <span>{jobs.paginationData.totalPages}</span>
                    ) : (
                        <span>No Pages</span>
                    )}
                </p>
                <button
                    onClick={() => setPage((prevState) => prevState + 1)}
                    className={
                        jobs.paginationData
                            ? page === jobs.paginationData.totalPages
                                ? "btn btn-reverse"
                                : "btn"
                            : "no data"
                    }
                    disabled={
                        jobs.paginationData
                            ? page === jobs.paginationData.totalPages
                                ? true
                                : false
                            : "something"
                    }
                >
                    <FaArrowCircleRight /> Next
                </button>
            </div>
        </>
    );
};

export default Jobs;
