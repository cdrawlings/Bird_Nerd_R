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
import AddBird from "./pages/addBird"
import Session from "./pages/session"
import PrivateRoute from "./components/PrivateRoute";
import AuthTemplate from "./components/AuthTemplate";
import ContentTemplate from "./components/ContentTemplate";


function App() {
    return <>
        <Router>
            <div className="container">
                <Routes>
                    <Route path="" element={<AuthTemplate/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>
                    </Route>
                </Routes>


                <Routes>
                    <Route path="" element={<ContentTemplate/>}>

                        <Route path="/dashboard" element={<PrivateRoute/>}>
                            <Route path="/dashboard" element={<Home/>}/>
                        </Route>
                        <Route path="/" element={<PrivateRoute/>}>
                            <Route path="/" element={<Current/>}/>
                        </Route>
                        <Route path="/bird" element={<PrivateRoute/>}>
                            <Route path="/bird" element={<Bird/>}/>
                        </Route>
                        <Route path="/profile" element={<PrivateRoute/>}>
                            <Route path="/profile" element={<Profile/>}/>
                        </Route>
                        <Route path="/find-bird" element={<PrivateRoute/>}>
                            <Route path="/find-bird" element={<FindBird/>}/>
                        </Route>
                        <Route path="/add-bird" element={<PrivateRoute/>}>
                            <Route path="/add-bird" element={<AddBird/>}/>
                        </Route>
                        <Route path="/session/:id" element={<PrivateRoute/>}>
                            <Route path="/session/:id" element={<Session/>}/>
                        </Route>

                    </Route>


                </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>
}

export default App;