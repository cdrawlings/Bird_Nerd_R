import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import {FaPlus} from "react-icons/fa";
import {getAllBird} from "../features/bird/birdSlice";
import {getSeen, postSeen, reset} from "../features/toggle/toggleSlice";


function Session() {
    const {user} = useSelector((state) => state.auth)
    const {session} = useSelector((state) => state.session)
    const {toggles, postSuccess, message} = useSelector((state) => state.toggle)
    const {birds} = useSelector((state) => state.bird)

    // const [items, setItems] = useState([]);
    const [views, setViews] = useState([]);

    //const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()


    // Gets the last bird watching session
    useEffect(() => {

        dispatch(getAllBird())
        dispatch(reset())
    }, [dispatch])

    useEffect(() => {
        if (postSuccess) {
            dispatch(getSeen(params.id))
        }

    }, [postSuccess, dispatch, params])


    const toggleBird = (index) => {
        const newViews = [...birds];

        let birdid = newViews[index]._id
        let count = 1
        let sessionid = params.id

        const seen = {
            birdid, count, sessionid
        }

        dispatch(postSeen(seen))


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

                    <div className='allBirds sessionList'>

                        {toggles.map((toggle) => (
                            <div className="col seen" key={toggle.birdId.speciesCode}>

                                <div className=''>{toggle.birdId.comName} </div>

                            </div>
                        ))
                        }

                    </div>

                    <h4>Unseen birds</h4>

                    <div className='allBirds sessionList'>
                        {birds.map((bird, index) => (
                            <div className="col seen" key={bird.speciesCode}>
                                {bird.isSeen ? (
                                    <>
                                        <div className='' id={`name-${bird.speciesCode}`}>{bird.comName} </div>
                                        <div className='hidden' id={bird.speciesCode}>{bird.speciesCode} </div>
                                        <div className='hidden' id={bird._id}>{bird._id} </div>
                                        <button value={bird._id} onClick={() => postSeen(index)}><FaPlus/></button>
                                    </>
                                ) : (
                                    <>
                                        <div className='' id={`name-${bird.speciesCode}`}>{bird.comName} </div>
                                        <div className='' id={bird.speciesCode}>{bird.speciesCode} </div>
                                        <div className='' id={bird._id}>{bird._id} </div>
                                        <button className="sessionCounter" onClick={() => toggleBird(index)}><FaPlus/>
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