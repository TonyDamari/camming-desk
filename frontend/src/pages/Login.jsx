import React from "react";
import { useState,useEffect } from "react";
import { FaSignInAlt} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login,reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const { name, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        //redirect when logged in
        if (user && user.isAdmin) {
            toast.success('Login Success')
        } else if((isSuccess || user ) && !user.isAdmin) {
            navigate('/')
            toast.success('Login Success')
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, dispatch,navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || password === "") {
            toast.error("Fields can't be empty");
        } else {
            const userData = {
                name,
                password,
            };

            dispatch(login(userData));
            // toast.success('Login Successful')
        }
    };

    if (isLoading){
        return <Spinner/>
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt />
                    Login
                </h1>
                <p>Please login</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Enter a name"
                            // required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter a password"
                            // required
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

export default Login;
