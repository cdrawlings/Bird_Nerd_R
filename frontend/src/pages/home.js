import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createSession} from '../features/session/sessionSlice'
import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import LastSession from "../components/LastSession";
import Spinner from "../components/spinner";
import {geteBirds} from "../features/ebirds/ebirdsSlice";
import {addLocation} from "../features/location/locationSlice";
import {getAllBird} from "../features/bird/birdSlice";
import {getLast} from "../features/last/lastSlice";


const colors = {
    "Acadian Flycatcher": "green",
    "American Goldfinch": "orange",
    "Cliff Swallow": "purple"
};

const data = [
    {
        "Acadian Flycatcher": 1,
        "American Goldfinch": 3,
        "Cliff Swallow": 6,
        "sessiondate": "2023-04-27T13:56:00.249Z"
    }
]


function Home() {
    const {user} = useSelector((state) => state.auth)

    const {location} = useSelector((state) => state.location)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {session, sessionSuccess} = useSelector((state) => state.session)
    const {birds} = useSelector((state) => state.bird)
    const {last} = useSelector((state) => state.last)

    const [success, setSuccess] = useState(false)
    const [keys, setKeys] = useState('');

    const [loading, setLoading] = useState(true)


    const created = dayjs(user.createdAt).format('dddd, MMMM D, YYYY')
    const updated = dayjs(user.updatedAt).format('dddd, MMMM D, YYYY')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const date = dayjs().format('dddd, MMMM D, YYYY')
    const position = [location.lat, location.lon]

    useEffect(() => {
        getCoords()
        dispatch(getAllBird())
        dispatch(getLast())
        // getKeys()
    }, [])

    const getCoords = async () => {
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

            setLoading(false)

            navigate('/dashboard')

        })
    }


    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16));


    const getKeys = () => {
        const newdate = last[0]

        let keybird = Object.keys(newdate);
        keybird.splice(3)
        setKeys(keybird)
    }

    console.log("Keys", keys)


    // When click saves the local data to a new session and updates the last session
    const sessionStart = (e) => {
        let sid = ObjectId();

        let city = location.city;
        let lat = location.lat;
        let lon = location.lon;
        let id = sid;
        // let temperature = document.getElementById('add_temp').innerText;
        // let visibility = document.getElementById('add_vis').innerText;
        // let condition = document.getElementById('add_cond').innerText;
        // let icon = document.getElementById('add_icon').innerText;


        let sessData = {
            city, lat, lon, id, // icon,
            // temperature,
            // visibility,
            // condition,
            user
        }

        dispatch(createSession(sessData))
        navigate('/session/' + sid)
    }

    const goFind = (e) => {
        navigate('/find-bird')
    }

    return (
        <>
            {loading ? (
                <>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>

                    <h1> Getting information about your location </h1>
                    <Spinner/>
                </>

            ) : (
                <>

                    <div className="main">

                        <p className="greeting">Current conditions for {location.city}, {date}</p>

                        <section className='dash-weather-card'>
                            <div className="weather-container">
                                <div className="current-info">
                                    <div className="weather-info">
                                        <h3 className='weather-subhead'>Temperature</h3>
                                        <div className='condition'>
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

                        <section>
                            <MapContainer className='map_container' center={position} zoom={13}
                                          scrollWheelZoom={false}
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
                        </section>

                        <section className='last-watch'>
                            <div className="last-container">
                                <p className="card-title">Last bird watching session</p>
                                <LastSession data={data} keys={keys} colors={colors}/>


                            </div>
                        </section>

                        <section className="bottom-cards">

                            <div className="dash-buttons">
                                <button className='btn-dash-card start-session' onClick={sessionStart}>Start bird
                                    watching
                                </button>
                                <button className='btn-dash-card add-bird' onClick={goFind}>Add a bird</button>
                            </div>

                        </section>


                    </div>
                </>
            )
            }
        </>
    )
}


export default Home;