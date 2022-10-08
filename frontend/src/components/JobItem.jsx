import React from "react";
import { Link } from "react-router-dom";

const JobItem = ({ job }) => {
    return (
        <div className="job">
            <div>{new Date(job.updatedAt).toLocaleString("en-ZA")}</div>
            <div>{job.file}</div>
            <div>{job.customer}</div>
            <div className={`name name-${job.cammer}`}>{job.cammer}</div>
            <span className={`status status-${job.status}`}>
                        {job.status}
                    </span>
            <Link to={`/job/${job._id}`} className="btn btn-reverse btn-sm">
                View
            </Link>
        </div>
    );
};

export default JobItem;
