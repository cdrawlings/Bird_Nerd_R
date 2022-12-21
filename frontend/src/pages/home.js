import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {createSession, getSession} from '../features/session/sessionSlice'

import dayjs from 'dayjs';


function Home() {
    const {user} = useSelector((state) => state.auth)
    const {location} = useSelector((state) => state.location)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {session} = useSelector((state) => state.session)

    const [success, setSuccess] = useState(false)

    const created = dayjs(user.createdAt).format('dddd, MMMM D, YYYY')
    const updated = dayjs(user.updatedAt).format('dddd, MMMM D, YYYY')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Gets the last bird watching session
    useEffect(() => {
        dispatch(getSession())
    }, [dispatch])


    // If asnewsession is created navigate to the session page with the new sessions ID
    useEffect(() => {
        if (success) {
            navigate('/session/' + session._id)
        }
    }, [navigate, session])


    // When click saves the local data to a new session and updates the last session
    const sessionStart = (e) => {
        let city = location.city;
        let lat = location.lat;
        let lon = location.lon;
        // let temperature = document.getElementById('add_temp').innerText;
        // let visibility = document.getElementById('add_vis').innerText;
        // let condition = document.getElementById('add_cond').innerText;
        // let icon = document.getElementById('add_icon').innerText;

        console.log("City", city)

        let sessData = {
            city,
            lat,
            lon,
            // icon,
            // temperature,
            // visibility,
            // condition,
            user
        }

        console.log("Session Data", sessData)

        dispatch(createSession(sessData))

        dispatch(getSession())

        console.log("New Session Data", session)

        setSuccess(true)
    }


    return (
        <>
            <div className="main">

                <section className="content">
                    <section>
                        <h3>Dashboard</h3>
                    </section>
                    <section>
                        <h1 id="user">User: {user.firstname} {user.lastname}</h1>
                        <h2 id="location">Location: {location.city}</h2>
                        <div id="weather">Weather</div>
                        <div id="seen">Seen</div>
                        <div id="seen">Created account: {created}</div>
                        <div id="seen">last Loggin: {updated}</div>
                        <div id="session">Start Session</div>
                        <div id="last_session">Last Session</div>
                    </section>
                    <section>
                        <h1>Add a bird</h1>
                        <Link to="/find-bird">
                            <button>Add</button>
                        </Link>
                    </section>
                    <section>
                        <h1>Start bird watching</h1>
                        <button onClick={sessionStart}>Start</button>
                    </section>
                </section>
            </div>
        </>
    );
}

export default Home;