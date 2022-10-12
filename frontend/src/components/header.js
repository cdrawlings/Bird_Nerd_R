import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
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
                    <Link to='/'>React Bird Nerd</Link>
                    <ul>

                        {user ? (
                            <li>
                                <button onClick={onLogout} > <FaSignOutAlt /> Logout</button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login"><FaSignInAlt />Login</Link>
                                </li>
                                <li>
                                <Link to="/register"><FaUser />Register</Link>
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
