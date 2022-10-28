import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllBird, reset} from "../features/bird/birdSlice";
import Spinner from "../components/spinner";
// import {useNavigate} from "react-router-dom";

import BackButton from "../components/BackButton";

function Profile() {
    const {location} = useSelector((state) => state.location)
    const {user} = useSelector((state) => state.auth)
    const {birds, isLoading, isSuccess } = useSelector((state) => state.bird )

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        return() => {
            if(isSuccess){
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
            dispatch(getAllBird())
        }, [dispatch]
    )

    if(isLoading) {
        return <Spinner />
    }


    return (
        <>

            <BackButton url={'/'} />

            <h1>{user.firstname}'s Profile</h1>
            <h2>Name: {user.firstname} {user.lastname}</h2>
            <h3>City: {location.city} </h3>

            <p>Account created: {user.createdAt}</p>
            <p>Last Loggedin: {user.updatedAt}</p>

            <h3>Lat: {location.lat}, Lon: {location.lon} </h3>
            <h4>Temp:{location.temp}</h4>
            <h4>Condition:{location.condition}</h4>
            <h4>Visibility:{location.visibility}</h4>



            <ul >
                {birds.map((bird) => {
                    return (

                        <li  className='bird-item' key={bird.comName}>
                            <p >{bird.comName}</p>
                            <p >{bird.speciesCode}</p>
                       </li>

                    )

                })}
            </ul>

        </>
    );
}

export default Profile;