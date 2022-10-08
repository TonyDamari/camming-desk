import React from "react";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    
    return (
        <>
            <section className="heading">
                <h1>What do you need to do?</h1>
                <p>Please choose an option below</p>
            </section>
            <Link to="/new-job" className="btn btn-reverse btn-block">
                <FaQuestionCircle /> Create New Job
            </Link>
            <Link to="/jobs" className="btn btn-block">
                <FaTicketAlt /> View Jobs
            </Link>
        </>
    );
};

export default Home;
