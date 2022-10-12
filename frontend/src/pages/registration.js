import React from 'react';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'



function Registration() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
    })

    const {firstname, lastname, email, password, password2,} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

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

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                firstname,
                lastname,
                email,
                password
            }
          dispatch(register(userData))
        }
    }

    return (
        <>
        <section className="logincard">
            <div className="heading">
                <h1><FaUser/> Register</h1>
                <p>Please register an account</p>
            </div>

            <div className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               id='firstname'
                               name='firstname'
                               value={firstname}
                               onChange={onChange}
                               placeholder='Enter your name'/>
                    </div>

                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               id='lastname'
                               name='lastname'
                               value={lastname}
                               onChange={onChange}
                               placeholder='Enter your last name'/>
                    </div>

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
                        <input type="password"
                               className="form-control"
                               id='password2'
                               name='password2'
                               value={password2}
                               onChange={onChange}
                               placeholder='Verify your password'/>
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

export default Registration;