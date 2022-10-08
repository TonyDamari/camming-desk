import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import NewJob from "./pages/NewJob";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";

export default function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/new-job" element={<PrivateRoute />}>
                            <Route path="/new-job" element={<NewJob />} />
                        </Route>
                        <Route path="/jobs" element={<PrivateRoute />}>
                            <Route path="/jobs" element={<Jobs />} />
                        </Route>
                        <Route path="/job/:jobId" element={<PrivateRoute />}>
                            <Route path="/job/:jobId" element={<Job />} />
                        </Route>
                    </Routes>
                    <Footer />
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}
