import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createJob, reset } from "../features/jobs/jobSlice";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewJob = () => {
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.jobs
    );

    const [name] = useState(user.name);
    const [file, setFile] = useState("");
    const [customer, setCustomer] = useState("");
    const [ref, setRef] = useState("");
    const [board, setBoard] = useState("Double Sided FR4");
    const [panel, setPanel] = useState("Proto");
    const [thickness, setThickness] = useState("");
    const [sales, setSales] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            dispatch(reset());
            navigate("/jobs");
        }

        dispatch(reset());
        setFile("");
        setCustomer("");
        setRef("");
        setThickness("");
        setSales("");
    }, [dispatch, isError, isSuccess, navigate, message]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createJob({
                name,
                file,
                customer,
                ref,
                board,
                panel,
                thickness,
                sales,
            })
        );
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <BackButton url="/" />
            <section className="heading">
                <h1>Create New Job</h1>
                <p>Please fill out this form below</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="cammer">Cammer</label>
                        <input
                            type="text"
                            value={name}
                            disabled
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">
                            File <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="file"
                            id="file"
                            value={file}
                            onChange={(e) => setFile(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customer">
                            Customer <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="customer"
                            id="customer"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ref">
                            Reference <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="ref"
                            id="name"
                            value={ref}
                            onChange={(e) => setRef(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="board">Board</label>
                        <select
                            name="board"
                            id="board"
                            value={board}
                            onChange={(e) => setBoard(e.target.value)}
                        >
                            <option value="Double Sided FR4">
                                Double Sided FR4
                            </option>
                            <option value="Single Sided FR4">
                                Single Sided FR4
                            </option>
                            <option value="Single Sided ALU">
                                Single Sided ALU
                            </option>
                            <option value="Multilayer">Multilayer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="panel">Panel</label>
                        <select
                            name="panel"
                            id="panel"
                            value={panel}
                            onChange={(e) => setPanel(e.target.value)}
                        >
                            <option value="Proto">Proto</option>
                            <option value="Production">Production</option>
                            <option value="Proto to Production">
                                Proto to Production
                            </option>
                            <option value="Restep">Restep</option>
                            <option value="Import">Import</option>
                            <option value="ECP">ECP</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="thickness">Thickness</label>
                        <input
                            type="text"
                            name="thickness"
                            id="thickness"
                            value={thickness}
                            onChange={(e) => setThickness(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sales">Sales Person</label>
                        <input
                            type="text"
                            name="sales"
                            id="sales"
                            value={sales}
                            onChange={(e) => setSales(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default NewJob;

