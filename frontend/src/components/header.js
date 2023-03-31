import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header>
            <nav>
                <div className="navbar">
                    <Link to='/dashboard' className='logobug'>BirdNird</Link>
                    <ul>

                        {user ? (
                            <>
                                <li className='flex-vert'>
                                    <div onClick={onLogout} className='btn-header'><span
                                        className='fa-header'> <FontAwesomeIcon icon={faSignOutAlt}/> </span> Logout
                                    </div>
                                </li>
                                <li className='flex-vert'>
                                    <Link to="/profile" className='btn-header'> Profile</Link>
                                </li>
                                <li className='flex-vert'>
                                    <Link to="#" className='btn-header'>My Birds</Link>
                                </li>
                            </>

                        ) : (
                            <>
                                <li className='flex-vert'>
                                    <Link to="/login" className='btn-header'><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                                </li>
                                <li className='flex-vert'>
                                    <Link to="/register" className='btn-header'><FontAwesomeIcon icon={faUser}/>Register</Link>
                                </li>
                            </>
                        )}





                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;