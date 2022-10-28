import React from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllBird, reset} from "../features/bird/birdSlice";

import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {toast} from "react-toastify";
import Spinner from '../components/spinner'



function AddBird() {
    const {birds, isLoading, isSuccess } = useSelector((state) => state.bird )

    const dispatch = useDispatch()
    const navigate = useNavigate()


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

<h1>Add a bird to the Database</h1>
        </>
    );
}

export default AddBird;