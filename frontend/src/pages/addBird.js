import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getLast} from "../features/last/lastSlice";
import {getLastSession} from "../features/lastSession/lastSessionSlice";
import {postSeen} from "../features/seen/seenSlice";

import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {toast} from "react-toastify";
import Spinner from '../components/spinner'

function AddBird() {
    const {user} = useSelector((state) => state.auth)
    const {last, isLoading, isError, message} = useSelector((state) => state.last)
    const {lastSession} = useSelector((state) => state.lastSession)

    const {single, Error, Success, Message, Loading} = useSelector((state) => state.single)
    const {location} = useSelector((state) => state.location)

    const [count, setCount] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (Error) {
            toast.error(message)
        }

    }, [Error, message])

    useEffect(() => {
            dispatch(getLast())
        dispatch(getLastSession())
        }, [dispatch]
    )


    useEffect(() => {
        if (Success) {

        }


    }, [Error, message])

    if (Loading) {
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
        let birdid = last._id
        let sessionid = lastSession._id

        let seenCount = {
            birdid,
            sessionid,
            count
        }

        console.log(seenCount)
        dispatch(postSeen(seenCount))

    }

    const position = [location.lat, location.lon]
    const date = dayjs(last.createdAt).format('dddd, MMMM D, YYYY')

    console.log(position)
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
                            <div id='' className='count_elem'>{count} </div>
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