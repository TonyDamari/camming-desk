import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, closeJob } from "../features/jobs/jobSlice";
import { getNotes, createNote } from "../features/notes/noteSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useState } from "react";


const customStyles = {
    content: {
        width: "600px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        position: "relative",
    },
};

Modal.setAppElement("#root");

const Job = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
   
    const { job, isLoading, isError, message } = useSelector(
        (state) => state.jobs
    );

    const { notes, isLoading: notesIsLoading } = useSelector(
        (state) => state.notes
    );

    const naviagte = useNavigate();
    const dispatch = useDispatch();
    const { jobId } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getJob(jobId));
        dispatch(getNotes(jobId));
        //eslint-disable-next-line
    }, [isError, message, jobId]);

    //close job
    const onJobClose = () => {
        dispatch(closeJob(jobId));

        toast.success("Job Closed");
        naviagte("/jobs");
    };

    //open/close modal
    // eslint-disable-next-line
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // create note submit
    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, jobId }));
        closeModal();
    };

    if (isLoading || notesIsLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something Went Wrong</h3>;
    }
    return (
        <div className="job-page">
            <header className="job-header">
                <BackButton url="/jobs" />
                <h2>
                    {/* Job ID: {job._id} */}
                    <span className={`status status-${job.status}`}>
                        {job.status}
                    </span>
                </h2>
                <h3>
                    Started: {new Date(job.createdAt).toLocaleString("en-ZA")}
                </h3>
                <h3>Finished: {job.status === 'closed' ? new Date(job.updatedAt).toLocaleString("en-ZA"): ''}</h3>
                <hr />
                <div className="job-desc">
                    <h3>Description</h3>
                    <p>
                        {" "}
                        <span className="text-bold">Cammmer:</span> {job.cammer}
                    </p>
                    <p>
                        <span className="text-bold">File:</span> {job.file}
                    </p>
                    <p>
                        <span className="text-bold">Customer:</span>{" "}
                        {job.customer}
                    </p>
                    <p>
                        <span className="text-bold">Board:</span> {job.board}
                    </p>
                    <p>
                        <span className="text-bold">Panel:</span> {job.panel}
                    </p>
                    <p>
                        <span className="text-bold">Thickness:</span>{" "}
                        {job.thickness}
                    </p>
                    <p>
                        <span className="text-bold">Sales:</span> {job.sales}
                    </p>
                </div>
                {/* <h2>Notes</h2> */}
            </header>

            {/* {job.status !== "closed" && (
                <button className="btn" onClick={openModal}>
                    <FaPlus /> Add Note
                </button>
            )} */}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Note"
            >
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>
                    X
                </button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className="form-control"
                            placeholder="Note text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {job.status !== "closed" && (
                <button
                    onClick={onJobClose}
                    className="btn btn-block btn-danger"
                >
                    Close Job
                </button>
            )}
        </div>
    );
};

export default Job;
