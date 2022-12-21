import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {postSeen} from "../features/seen/seenSlice";
// import {createBird, reset} from "../features/bird/birdSlice";
// import {createSession, reset as resetSession} from "../features/session/sessionSlice";
import {FaPlus} from "react-icons/fa";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import dayjs from "dayjs";


/* gets and displays the list of birds. Once a bird is selected
it will be added to the Bird Database

The page will advance to add-bird. There the bird will be added
to the session database and the number of birds
will be added to the cCount database
 */
function FindBird() {
    const {user} = useSelector((state) => state.auth)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {location} = useSelector((state) => state.location)

    const [filtered, setFiltered] = useState([])
    const [count, setCount] = useState(1)

    const [seen, setSeen] = useState({
        city: "",
        lat: "",
        lon: "",
        count: "",
        temp: "",
        condition: "",
        icon: "",
        visibility: "",
        seen: false,
        comName: "",
        speciesCode: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Filter the bird by input
    const filter = (e) => {
        let birdList = document.getElementById('birdlist')

        let value = e.target.value.toLowerCase();
        birdList.style.display = 'block'

        let result = [];
        result = ebirds.filter((bird) => {
            return bird.comName.toLowerCase().search(value) !== -1;
        });
        setFiltered(result);
    }

    // Show the full list of birds
    const fillList = () => {
        let birdList = document.getElementById('birdlist')
        birdList.style.display = 'block'

        setFiltered(ebirds)
    }

    // Reset the search bar
    function reloadComponent() {
        let filter = document.getElementById('filter')
        let birdList = document.getElementById('birdlist')
        let resetBird = []
        setFiltered(resetBird);

        filter.value = '';
        birdList.style.display = 'none'
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

    // Adds Bird info and intial seesion info to seen state
    const markSeen = (e) => {
        const comName = e.currentTarget.previousElementSibling.innerText;
        const speciesCode = e.currentTarget.previousElementSibling.previousElementSibling.innerText;

        setSeen((prevState) => ({
            ...prevState,
            comName,
            speciesCode,
            city: location.city,
            lat: location.lat,
            lon: location.lon,
            seen: true
        }))
    }


    const postNewBird = (e) => {
        setSeen((prevState) => ({
            ...prevState,
            count
        }))

        dispatch(postSeen(seen))

        console.log("Seen Saved")

        navigate('/dashboard')

    }

    console.log("New Seen 2", seen)

    const position = [location.lat, location.lon]

    const date = dayjs().format('dddd, MMMM D, YYYY')

    return (
        <>
            <div className="main">


                {!seen.seen ? (
                    <>
                        <section className="content">

                            <h1 className='title'>Add a bird </h1>
                            <p className='title-sub-text'>See a new bird? quickly add it to your viewed birds list.</p>

                            <input
                                type="text"
                                id="filter"
                                name="filter"
                                className="form-control search-bar"
                                onChange={(e) => filter(e)}
                                placeholder='Search birds'
                            />

                            <div className="search-adds">
                                <button className="full-list" onClick={fillList}>Full List</button>
                                <button className="reset" onClick={reloadComponent}>Reset</button>
                            </div>
                        </section>

                        <section>
                            <div className="searchcontainer">
                                <div className="searchbox ">

                                    <ul id='birdlist'>
                                        {filtered.map((bird) => {
                                            return (

                                                <div className='bird-item' key={bird.comName}>
                                                    <div className='hidden'>{bird.speciesCode}</div>
                                                    <div>{bird.comName}</div>
                                                    <button id={bird.speciesCode} onClick={markSeen}
                                                            className="bird-box"><FaPlus/></button>
                                                </div>

                                            )

                                        })}
                                    </ul>

                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <>
                        <div className="main">

                            <section className="content">

                                <div className='seen_title'>Add</div>
                                <div id='add_comName' className='seen_bird'>{seen.comName}</div>
                                <div className='seen_text'>to birds you have seen before.</div>

                                <div className="counter_block">
                                    <div className="counter_text">How many seen:</div>

                                    <div className="counter_elements">
                                        <button onClick={minusOne} className='minus_button'>-</button>
                                        <div id='' className='count_elem'>{count} </div>
                                        <button className='add_button' onClick={addOne}>+</button>
                                    </div>
                                </div>

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

                                <div className="loc-date">
                                    <p id='add_city' className='seen_city'> {location.city}</p>
                                    <p className='seen_time'>{date}</p>
                                </div>

                                <button onClick={postNewBird} className="btn btn_session">ACCEPT</button>


                            </section>
                        </div>
                    </>

                )

                }

            </div>
        </>
    );
}

export default FindBird;