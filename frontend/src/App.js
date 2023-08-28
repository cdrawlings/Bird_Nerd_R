import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home'
import Login from './pages/login'
import Registration from './pages/registration'
import Bird from './pages/bird'
import Profile from "./pages/profile";
import FindBird from "./pages/findBird"
import Load from "./pages/load"
import New from "./pages/new"
import Start from "./pages/home_start"
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
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/" element={<Login/>}/>


                        <Route index element={<Login/>}/>

                        <Route
                            path="/load"
                            element={
                                <PrivateRoute>
                                    <Load/>
                                </PrivateRoute>
                            }/>

                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Home/>
                                </PrivateRoute>
                            }/>

                        <Route
                            path="/new"
                            element={
                                <PrivateRoute>
                                    <New/>
                                </PrivateRoute>
                            }/>

                        <Route
                            path="/home_start"
                            element={
                                <PrivateRoute>
                                    <Start/>
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