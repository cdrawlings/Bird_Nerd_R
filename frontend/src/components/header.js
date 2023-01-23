import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";

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
                                        className='fa-header'> <FaSignOutAlt/> </span> Logout
                                    </div>
                                </li>
                                <li className='flex-vert'>
                                    <Link to="/profile" className='btn-header'> Profile</Link>
                                </li>
                            </>

                        ) : (
                            <>
                                <li className='flex-vert'>
                                    <Link to="/login" className='btn-header'><FaSignInAlt/> Login</Link>
                                </li>
                                <li className='flex-vert'>
                                    <Link to="/register" className='btn-header'><FaUser/>Register</Link>
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