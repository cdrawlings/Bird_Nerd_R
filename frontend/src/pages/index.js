import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {logout, reset} from "../features/auth/authSlice";


function Index() {
    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        console.log('hello')

        // Redirect when logged in
        if (isSuccess || user) {
            const checkDate = new Date(Date.now() - 24 * 3600 * 1000)
            const created = user.createdAt
            const today = checkDate.toISOString()

            console.log('checking')
            if (today > created) {
                console.log("Older")
                console.log(user)
                dispatch(logout())
                navigate('/login')
            }
            console.log("user", created)
            console.log(checkDate)
            console.log("iso", today)

        } else {
            console.log("Newer")
            navigate('/login')
        }

        dispatch(reset())
    }, [isSuccess, isError, message, user, navigate, dispatch])
    return (
        <>
            <h1>Index 2</h1>
        </>
    )
}

export default Index