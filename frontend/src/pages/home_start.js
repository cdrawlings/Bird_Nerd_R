import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import dayjs from 'dayjs';

import {createSession} from '../features/session/sessionSlice'


function Home() {
    const {user} = useSelector(state => state.auth)
    const {location} = useSelector((state) => state.location)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {birds} = useSelector((state) => state.bird)


    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const date = dayjs().format('dddd, MMMM D, YYYY')

    const position = [location.lat, location.lon]

    console.log("position", location.lat, location.lon)

    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16));


    const goFind = (e) => {
        navigate('/find-bird')

    }


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


    const data = [
        {
            "Acadian Flycatcher": 1,
            "American Goldfinch": 3,
            "Cliff Swallow": 6,
            "sessiondate": "2023-04-27T13:56:00.249Z"
        }
    ]

    const keyey = [
        "Acadian Flycatcher",
        "American Goldfinch",
        "Cliff Swallow"
    ]


    console.log("New start no Last")


    return (
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
                    <p> No birds spotted last login</p>

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
    );
}


export default Home;