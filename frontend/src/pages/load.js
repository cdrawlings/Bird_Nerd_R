import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {geteBirds} from "../features/ebirds/ebirdsSlice";
import {addLocation} from "../features/location/locationSlice";
import {getAllBird} from "../features/bird/birdSlice";


function Load() {
    const {user} = useSelector(state => state.auth)
    const {location} = useSelector((state) => state.location)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {birds} = useSelector((state) => state.bird)


    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            const locApi = "AIzaSyAF2o2lBWk9H8JQhpwvI_U9e5rFZUikQY4";
            const apiKey = 'c2badbed053fc07c15b017c4906fade6';
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            // let weather = null
            let ebirds = null
            let city //, temp, condition, icon, visibility

            let myHeaders = new Headers();
            myHeaders.append("X-eBirdApiToken", "vsqqs32292mi");
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            // Get location information
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${locApi}`
            )

            if (response) {
                let data = await response.json()
                city = data.results[0].address_components[3].long_name
            }

            // Get the recent birds seen?? in the area from ebird.org
            const birdsResponse = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}`, requestOptions)
            ebirds = await birdsResponse.json()
            ebirds.sort((a, b) => a.comName.localeCompare(b.comName))
            dispatch(geteBirds(ebirds))

            // Get weather from open weather org
            /*

                // Get weather information
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
            )

            weather = await weatherResponse.json()

            temp = weather.main.temp
            visibility = weather.visibility
            condition = weather.weather[0].description
            icon = weather.weather[0].icon
            */

            const placeData = {
                lat, lon, city, // temp, condition, icon,  visibility
            }

            dispatch(addLocation(placeData))

            dispatch(getAllBird())


            // setLoading(false)

            if (birds !== '') {
                navigate('/dashboard')
            }


        })
    }, [dispatch, navigate, geteBirds, getAllBird,])

    return (
        <>
            <br/><br/><br/>
            <h1>Index 2</h1>
            <h3>LOADING... </h3>
        </>
    )
}

export default Load