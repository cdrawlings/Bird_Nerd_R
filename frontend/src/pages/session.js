import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateTime} from "../features/time/updateSlice";
import {reset as seenReset} from "../features/seen/seenSlice";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import {FaPlus} from "react-icons/fa";
import {getAllBird} from "../features/bird/birdSlice";


function Session() {
    const {user} = useSelector((state) => state.auth)
    const {session} = useSelector((state) => state.session)
    const {birds} = useSelector((state) => state.bird)

    // const [items, setItems] = useState([]);
    const [views, setViews] = useState([]);

    //const [inputValue, setInputValue] = useState('');
    console.log("Birds", birds)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    // Gets the last bird watching session
    useEffect(() => {
        dispatch(getAllBird())
    }, [dispatch])


    const toggleSeen = (index) => {
        const newViews = [...birds];

        let birdid = newViews[index]._id
        let count = 1
        let sessionid = params.id


        const seen = {
            birdid, count, sessionid, user
        }

        const now = Date.now()
        const string = new Date(now)
        const updated = string.toISOString()

        const updateUpdated = {
            updated, birdid
        }

        console.log("Update Time: ", updateUpdated)

        // dispatch(postSeen(seen))

        dispatch(seenReset())

        dispatch(updateTime(updateUpdated))
    };


    return (
        <>
            <div className="main">

                <article className="content">
                    <BackButton url='/dashboard'/>
                    <p>Session city: {session.city}</p>
                    <p>Session Latitude: {session.lat}</p>
                    <p>Session Lon: {session.lon}</p>

                    <h4>Seen birds</h4>

                    <h4>Unseen birds</h4>

                    <div className='allBirds sessionList'>
                        {birds.map((bird, index) => (
                            <div className="col seen" key={bird.speciesCode}>
                                {bird.isSeen ? (
                                    <>
                                        <div className='' id={`name-${bird.speciesCode}`}>{bird.comName} </div>
                                        <div className='hidden' id={bird.speciesCode}>{bird.speciesCode} </div>
                                        <div className='hidden' id={bird._id}>{bird._id} </div>
                                        <button value={bird._id} onClick={() => toggleSeen(index)}><FaPlus/></button>
                                    </>
                                ) : (
                                    <>
                                        <div className='' id={`name-${bird.speciesCode}`}>{bird.comName} </div>
                                        <div className='' id={bird.speciesCode}>{bird.speciesCode} </div>
                                        <div className='' id={bird._id}>{bird._id} </div>
                                        <button className="sessionCounter" onClick={() => toggleSeen(index)}><FaPlus/>
                                        </button>
                                    </>
                                )
                                }

                            </div>
                        ))
                        }
                    </div>

                </article>
            </div>


        </>
    );
}

export default Session;