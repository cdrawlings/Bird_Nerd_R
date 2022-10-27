import React from 'react';
import {useSelector} from "react-redux";

function Profile() {
    const {location} = useSelector((state) => state.location)
    const {user} = useSelector((state) => state.auth)
    const {birds} = useSelector((state) => state.birds)

    console.log(user)

    return (
        <div>

            <h1>Profile</h1>
            <h2>Name: {user.firstname} {user.lastname}</h2>
            <h3>City: {location.city} </h3>

            <p>Account created: {user.createdAt}</p>
            <p>Last Loggedin: {user.updatedAt}</p>

            <h3>Lat: {location.lat}, Lon: {location.lon} </h3>
            <h4>Temp:{location.temp}</h4>
            <h4>Condition:{location.condition}</h4>
            <h4>Visibility:{location.visibility}</h4>

        </div>
    );
}

export default Profile;