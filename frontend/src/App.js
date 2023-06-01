import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home'
import Login from './pages/login'
import Registration from './pages/registration'
import Bird from './pages/bird'
import Profile from "./pages/profile";
import Current from "./pages/current";
import FindBird from "./pages/findBird"
// import AddBird from "./pages/addBird"
import Session from "./pages/session"
import PrivateRoute from "./components/PrivateRoute";
import Header from './components/header';


function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header/>
                    <Routes>
                        <Route path="/current" element={<Current/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/" element={<Home/>}/>


                        <Route index element={<Home/>}/>

                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Home/>
                                </PrivateRoute>
                            }/>


                        <Route
                            path="/bird"
                            element={
                                <PrivateRoute>
                                    <Bird/>
                                </PrivateRoute>
                            }/>

                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile/>
                                </PrivateRoute>
                            }/>

                        <Route
                            path="/find-bird"
                            element={
                                <PrivateRoute>
                                    <FindBird/>
                                </PrivateRoute>
                            }/>


                        <Route
                            path="/session/:id"
                            element={
                                <PrivateRoute>
                                    <Session/>
                                </PrivateRoute>
                            }/>


                    </Routes>
                </div>
            </Router>
            <ToastContainer/>
        </>
    )
}

export default App;