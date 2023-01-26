import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {createSession, getSession} from '../features/session/sessionSlice'

import dayjs from 'dayjs';


function Home() {
    const {user} = useSelector((state) => state.auth)
    const {location} = useSelector((state) => state.location)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {session, sessionSuccess} = useSelector((state) => state.session)

    const [success, setSuccess] = useState(false)

    const created = dayjs(user.createdAt).format('dddd, MMMM D, YYYY')
    const updated = dayjs(user.updatedAt).format('dddd, MMMM D, YYYY')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Gets the last bird watching session
    useEffect(() => {
        dispatch(getSession())
    }, [dispatch])


    // When click saves the local data to a new session and updates the last session
    const sessionStart = (e) => {
        let city = location.city;
        let lat = location.lat;
        let lon = location.lon;
        // let temperature = document.getElementById('add_temp').innerText;
        // let visibility = document.getElementById('add_vis').innerText;
        // let condition = document.getElementById('add_cond').innerText;
        // let icon = document.getElementById('add_icon').innerText;

        let sessData = {
            city, lat, lon, // icon,
            // temperature,
            // visibility,
            // condition,
            user
        }

        dispatch(createSession(sessData))

        dispatch(getSession())

        setSuccess(true)

        navigate('/session/' + session._id)
    }


    return (<>
            <div className="main">

                <p className='greeting'>Hello {user.firstname}, lets spot some birds.</p>

                <section className='dash-weather-card'>
                    <div className="weather-container">
                        <p className="card-title">Current conditions in kalaual umpur {location.city}</p>
                        <div className="current-info">
                            <div className="weather-info">
                                <h3 className='weather-subhead'>Temperature</h3>
                                <div className='temperature'>
                                    63°
                                </div>
                            </div>

                            <div className="weather-info">
                                <h3 className='weather-subhead'>Condition</h3>
                                <div className='condition'>
                                    Cloudy
                                </div>
                            </div>

                            <div className="weather-info">
                                <h3 className='weather-subhead'>Visibility</h3>
                                <div className='condition'>
                                    500ft
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bottom-cards">
                    <div className="dash-buttons">
                        <button className='btn-dash-card start-session' onClick={sessionStart}>Start bird watching
                        </button>

                        <Link to="/find-bird">
                            <button className='btn-dash-card add-bird'>Add a bird</button>
                        </Link>

                        <Link to="/find-bird">
                            <button className='btn-dash-card spotted-bird'>Spotted birds</button>
                        </Link>
                    </div>
                </section>

                <section className='last-watch'>
                    <div className="last-container">
                        <p className="card-title">Last bird watching session</p>
                        <p>Last bird watching session</p>
                    </div>
                </section>

            </div>
        </>
    );
}


export default Home;