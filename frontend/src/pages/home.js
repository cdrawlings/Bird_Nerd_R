import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createSession} from '../features/session/sessionSlice'
import dayjs from 'dayjs';
import {getAllBird} from "../features/bird/birdSlice";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import LastSession from "../components/LastSession";
import {getLast} from "../features/last/lastSlice";

const data = [
    {year: 1980, efficiency: 24.3, sales: 8949000},
    {year: 1985, efficiency: 27.6, sales: 10979000},
    {year: 1990, efficiency: 28, sales: 9303000},
    {year: 1991, efficiency: 28.4, sales: 8185000},
    {year: 1992, efficiency: 27.9, sales: 8213000},
    {year: 1993, efficiency: 28.4, sales: 8518000},
    {year: 1994, efficiency: 28.3, sales: 8991000},
    {year: 1995, efficiency: 28.6, sales: 8620000},
    {year: 1996, efficiency: 28.5, sales: 8479000},
    {year: 1997, efficiency: 28.7, sales: 8217000},
    {year: 1998, efficiency: 28.8, sales: 8085000},
    {year: 1999, efficiency: 28.3, sales: 8638000},
    {year: 2000, efficiency: 28.5, sales: 8778000},
    {year: 2001, efficiency: 28.8, sales: 8352000},
    {year: 2002, efficiency: 29, sales: 8042000},]
function Home() {
    const {user} = useSelector((state) => state.auth)
    const {location} = useSelector((state) => state.location)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {session, sessionSuccess} = useSelector((state) => state.session)
    const {birds} = useSelector((state) => state.bird)
    const {last} = useSelector((state) => state.last)

    const [success, setSuccess] = useState(false)

    const created = dayjs(user.createdAt).format('dddd, MMMM D, YYYY')
    const updated = dayjs(user.updatedAt).format('dddd, MMMM D, YYYY')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const date = dayjs().format('dddd, MMMM D, YYYY')
    const position = [location.lat, location.lon]

    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16));

    // Gets the last bird watching session
    useEffect(() => {
        dispatch(getAllBird())
        dispatch(getLast())
        //  dispatch(flattened())
    }, [dispatch])


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

    return (<>
            <div className="main">


                <p className="greeting">Current conditions for kalaual umpur Bostin {location.city}, {date}</p>


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


                <section className='last-watch'>
                    <div className="last-container">
                        <p className="card-title">Last bird watching session</p>
                        <p>Last bird watching session</p>
                        <LastSession data={last}/>
                    </div>
                </section>

                <section className="bottom-cards">
                    <div className="dash-buttons">
                        <button className='btn-dash-card start-session' onClick={sessionStart}>Start bird watching
                        </button>


                        <button className='btn-dash-card add-bird' onClick={goFind}>Add a bird</button>


                    </div>
                </section>

            </div>
        </>
    );
}


export default Home;