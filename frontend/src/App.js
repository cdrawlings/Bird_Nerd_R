import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home'
import Login from './pages/login'
import Registration from './pages/registration'
import Bird from './pages/bird'
import Profile from "./pages/profile";
import Current from "./pages/current";
import AddBird from "./pages/addBird"

import Header from './components/header'
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return <>
    <Router>
      <div className="container">
        <Header />
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/dashboard" element={<PrivateRoute />} >
              <Route path="/dashboard" element={<Home />} />
          </Route>
          <Route path="/" element={<PrivateRoute />} >
            <Route path="/" element={<Current />} />
          </Route>
          <Route path="/bird" element={<PrivateRoute />} >
            <Route path="/bird" element={<Bird />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />} >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/add-bird" element={<PrivateRoute />} >
            <Route path="/add-bird" element={<AddBird />} />
          </Route>

        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>
}

export default App;

