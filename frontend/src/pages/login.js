import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {login, reset} from '../features/auth/authSlice'
import BirdImg from '../img/login.jpg'
import Spinner from '../components/spinner'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    const {email, password} = formData

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // Redirect when logged in
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isSuccess, isError, message, user, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner/>
    }


    return (
        <>

            <section className='logincontainer'>
                <div>
                    <img className='login-image' src={BirdImg} alt=""/>
                </div>

                <div className="logincard">
                    <div className="login-title">
                        <h1>BirdNird</h1>
                        <p className="login-subtitle">The bird watchers tracking app</p>
                    </div>
                    <div className="login-text">
                        <h1><FaSignInAlt/> Login</h1>
                    </div>

                    <div className="form">
                        <form onSubmit={onSubmit}>


                            <div className="form-group">
                                <input type="text"
                                       className="form-control"
                                       id='email'
                                       name='email'
                                       value={email}
                                       onChange={onChange}
                                       placeholder='Enter your email'/>
                            </div>

                            <div className="form-group">
                                <input type="password"
                                       className="form-control"
                                       id='password'
                                       name='password'
                                       value={password}
                                       onChange={onChange}
                                       placeholder='Enter your password'/>
                            </div>

                            <div className="form-group">
                                <button type='submit' className='btn btn-register'>Submit</button>
                            </div>


                        </form>
                    </div>

                    <div className='login-register'>
                        <Link to="/register">Register</Link>
                    </div>

                </div>
            </section>
        </>
    )
        ;
}

export default Login;