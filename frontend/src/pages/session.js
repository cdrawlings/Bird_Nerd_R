import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import {FaPlus} from "react-icons/fa";
import {getAllBird} from "../features/bird/birdSlice";
import {postSeen, reset} from "../features/toggle/toggleSlice";


function Session() {
    const {user} = useSelector((state) => state.auth)
    const {session} = useSelector((state) => state.session)
    const {toggles, postSuccess, message} = useSelector((state) => state.toggle)
    const {birds, isSuccess} = useSelector((state) => state.bird)

    // const [items, setItems] = useState([]);
    const [previous, setPrevious] = useState([])
    const [spotted, setSpotted] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    // Gets the birds seen by user
    useEffect(() => {
        dispatch(getAllBird())
        dispatch(reset())
    }, [dispatch])

    // IF Get akll birds is succes then set birds to previous
    useEffect(() => {
        if (isSuccess) {
            setPrevious(birds)
        }
    }, [isSuccess, setPrevious])

    // Gets the birds seen this session
    useEffect(() => {
        if (postSuccess) {
            console.log("Toggled TB 1:", toggles)
            console.log("Previous birds TB 1:", previous)
            console.log("Spotted birds TB 1:", spotted)


        }
    }, [postSuccess])


    const toggleBird = (index) => {
        const newViews = [...birds];

        const birdid = newViews[index]._id
        const speciesCode = newViews[index].speciesCode
        const comName = newViews[index].comName
        const count = 1
        const sessionid = params.id

        const seen = {birdid, count, sessionid, speciesCode, comName}

        setSpotted(spotted => [...spotted, seen])

        dispatch(postSeen(seen))


        let element
        element = document.getElementById(speciesCode)
        element = element.parentElement
        element.removeAttribute("class", "row");
        element.setAttribute("class", "hidden");
        element.clear()

    };

    return (
        <>
            <BackButton url='/dashboard'/>
            <div className="main">

                <article className="session-space">


                    <section className="current-conditions">
                        <h1 className='title find-top '>Bird watching in {session.city}</h1>
                    </section>

                    <section className="seen-session">
                        <h4>Seen birds</h4>

                        <div className='allBirds sessionList'>

                            {spotted.map((toggle) => (
                                <div className="bird-item watch-box" key={toggle.speciesCode}>

                                    <div className='hidden'>{toggle.speciesCode}</div>
                                    <div>{toggle.comName}</div>

                                    -
                                    <div>{toggle.count}</div>
                                    +

                                </div>
                            ))
                            }

                        </div>

                    </section>
                    <section className="unseen-session">
                        <h4>Unseen birds</h4>

                        <div className='allBirds sessionList'>
                            {previous.map((bird, index) => (
                                <>
                                    <div className="bird-item watch-box" key={bird.speciesCode}>
                                        <div className='' id={`name-${bird.speciesCode}`}>{bird.comName} </div>

                                        <button id={bird.speciesCode} className="sessionCounter"
                                                onClick={() => toggleBird(index)}><FaPlus/>
                                        </button>


                                    </div>
                                </>
                            ))
                            }
                        </div>
                    </section>

                </article>
            </div>


        </>
    );
}

export default Session;