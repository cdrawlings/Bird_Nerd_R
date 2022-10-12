import React from 'react';
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/spinner'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    const {email, password} = formData

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        // Redirect when logged in
        if(isSuccess || user) {
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

    if (isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="logincard">
                <div className="heading">
                    <h1><FaSignInAlt/> Login</h1>
                    <p>Please Login</p>
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
            </section>
        </>
    )
        ;
}

export default Login;