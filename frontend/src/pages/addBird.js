import React from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getLast, reset} from "../features/last/lastSlice";

import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {toast} from "react-toastify";
import Spinner from '../components/spinner'

function AddBird() {
    const {user} = useSelector((state) => state.auth)
    const {last, isLoading, isSuccess, isError, message} = useSelector((state) => state.last)
    const {location} = useSelector((state) => state.location)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }


    }, [isError, message])

    useEffect(() => {
            dispatch(getLast())
        }, [dispatch]
    )

    if(isLoading) {
        return <Spinner />
    }

    const position = [location.lat, location.lon]
    const date = dayjs(last.createdAt).format('dddd, MMMM D, YYYY')


    return (
        <>
            <h1>Add a bird to the Database</h1>

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


        </>
    );
}

export default AddBird;