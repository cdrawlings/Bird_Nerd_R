import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getLast, reset} from "../features/last/lastSlice";
import {createSession, sessionReset} from "../features/session/sessionSlice";

import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {toast} from "react-toastify";
import Spinner from '../components/spinner'

function AddBird() {
    const {user} = useSelector((state) => state.auth)
    const {last, isLoading, isError, message} = useSelector((state) => state.last)
    const {session, sessionError, sessionSuccess, sessionMessage} = useSelector((state) => state.session)
    const {location} = useSelector((state) => state.location)

    const [count, setCount] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (sessionError) {
            toast.error(sessionMessage)
        }

        if (sessionSuccess) {
            dispatch(sessionReset())
            dispatch(reset())
            navigate('/')
        }
    }, [isError, message, sessionMessage, sessionSuccess, navigate, dispatch])

    useEffect(() => {
            dispatch(getLast())
        }, [dispatch]
    )

    if (isLoading) {
        return <Spinner/>
    }


    // Add one to count
    const addOne = (e) => {
        // Counter state is incremented
        setCount(count + 1);
    }

    // Minus one to count
    const minusOne = (e) => {
        // Counter state is incremented
        setCount(c => Math.max(c - 1, 0));
    }

    const getData = (e) => {
        let city = location.city;
        let lat = location.lat;
        let lon = location.lon;
        // let temperature = document.getElementById('add_temp').innerText;
        // let visibility = document.getElementById('add_vis').innerText;
        // let condition = document.getElementById('add_cond').innerText;
        // let icon = document.getElementById('add_icon').innerText;
        let comName = last.comName;
        let speciesCode = last.speciesCode;
        let birdid = last._id;
        let user = last.user

        let sessData = {
            city,
            lat,
            lon,
            // icon,
            // temperature,
            // visibility,
            // condition,
            count,
            comName,
            speciesCode,
            birdid,
            user
        }

        console.log(sessData)
        dispatch(createSession(sessData))
    }

    const position = [location.lat, location.lon]
    const date = dayjs(last.createdAt).format('dddd, MMMM D, YYYY')


    return (
        <>
            <div className="main">

                <section className="content">

                    <div className='seen_title'>Add</div>
                    <div id='add_comName' className='seen_bird'>{last.comName}</div>
                    <div className='seen_text'>to birds you have seen before.</div>

                    <div className="counter_block">
                        <div className="counter_text">How many seen:</div>

                        <div className="counter_elements">
                            <button onClick={minusOne} className='minus_button'>-</button>
                            <div id='add_count' className='count_elem'>{count} </div>
                            <button className='add_button' onClick={addOne}>+</button>
                        </div>
                    </div>

                    <MapContainer className='map_container' center={position} zoom={13} scrollWheelZoom={false}
                                  attributionControl={false}>

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br/> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>

                    <div className="loc-date">
                        <p id='add_city' className='seen_city'> {location.city}</p>
                        <p className='seen_time'>{date}</p>
                    </div>

                    <div className='hidden'>

                        <p id='add_user'>User: {last.user}</p>

                        <p id='add_speciesCode'>Species code:{last.speciesCode}</p>
                        <p id='add_bird_id'>BIRD ID: {last._id}</p>

                        <p id='add_lat'>Lat: {location.lat}</p>
                        <p id='add_lon'>Lon: {location.lon}</p>

                    </div>

                    <button onClick={getData} className="btn btn_session">ACCEPT</button>


                </section>
            </div>


        </>
    );
}

export default AddBird;