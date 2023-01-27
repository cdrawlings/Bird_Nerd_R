import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Modal from 'react-modal';
import BackButton from "../components/BackButton";
import {getAllBird} from "../features/bird/birdSlice";
import {postSeen, reset} from "../features/toggle/toggleSlice";
import {FaDove, FaInfo} from "react-icons/fa";


const customStyle = {
    content: {
        backgroundColor: 'transparent',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: "translate(-50%, -50%)",
        border: "0",
    }
}

Modal.setAppElement('#root')

function Session() {
    const {user} = useSelector((state) => state.auth)
    const {session} = useSelector((state) => state.session)
    const {birds, isSuccess} = useSelector((state) => state.bird)

    // const [items, setItems] = useState([]);
    const [spotted, setSpotted] = useState([])
    const [sessionBirds, setSessionBirds] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    // Gets the birds seen by user
    useEffect(() => {
        dispatch(getAllBird())
        dispatch(reset())
    }, [dispatch])

    // IF Get all birds is successful then add a count element and set birds to sessionBirds
    useEffect(() => {
        if (isSuccess) {
            const viewed = birds.map((bird) => {

                const comName = bird.comName
                const count = 0
                const speciesCode = bird.speciesCode
                const birdid = bird._id
                const updated = bird.updated
                const user = bird.user
                const sessionid = params.id
                const seen = false

                const toggle = {birdid, count, sessionid, speciesCode, comName, seen, user}

                console.log("Toggled", toggle)

                return toggle

            })
            setSessionBirds(viewed)
        }
    }, [isSuccess, setSessionBirds])

    // Add one to count
    const addOne = (index) => {
        // Counter state is incremented
        const views = sessionBirds;
        console.log("1", views)
        const viewed = views.map((bird, i) => {
            if (i === index) {
                // Increment the clicked counter
                const comName = bird.comName
                const count = bird.count + 1
                const speciesCode = bird.speciesCode
                const birdid = bird.birdid
                const updated = Date.now()
                const sessionid = params.id
                const seen = true

                const toggle = {birdid, count, sessionid, speciesCode, comName, seen}
                console.log("2", toggle)
                dispatch(postSeen(toggle))
                dispatch(reset())
                return toggle


            } else {
                // The rest haven't changed

                return bird
            }
        });


        setSessionBirds(viewed)

    }

    // Minus one to count
    const minusOne = (index) => {
        // Counter state is incremented
        const views = sessionBirds;


        const viewed = views.map((bird, i) => {
            if (i === index) {
                // Decrease the clicked counter

                const comName = bird.comName
                const count = bird.count - 1
                const speciesCode = bird.speciesCode
                const birdid = bird.birdid
                const updated = Date.now()
                const sessionid = params.id
                const seen = true

                const toggle = {birdid, count, sessionid, speciesCode, comName, seen}
                dispatch(postSeen(toggle))
                console.log("2", toggle)
                return toggle

            } else {
                // The rest haven't changed

                return bird
            }
        });


        setSessionBirds(viewed)

    }
// open/ close Modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const onChange = (e) => {
    };

    return (
        <>

            <div className="main">

                <div className="nav-sec">
                    <BackButton url='/dashboard'/>
                    <BackButton url='/add'/>
                </div>

                <article className="session-space">


                    <section className="unseen-session">

                        <h1 className='title find-top session-heading'>Bird watching in {session.city}</h1>

                        <button className="info" id="info" onClick={openModal}><FaInfo/></button>

                        <h4 className='session-title'>Your previously spotted birds</h4>


                        <div className='allBirds sessionList'>
                            {sessionBirds.map((bird, index) => (
                                <>
                                    {bird.count <= 0 ?

                                        <div className="bird-item watch-box-unseen" key={bird.speciesCode}>

                                            <div className="unseen-icon"></div>


                                            <div className='bird-name'
                                                 id={`name-${bird.speciesCode}`}>{bird.comName} </div>


                                            <button className="minus_button" onClick={() => minusOne(index)}></button>

                                            <div className="bird-count">{bird.count}</div>

                                            <button className="add_button" onClick={() => addOne(index)}>+</button>
                                        </div> :

                                        <div className="bird-item watch-box" key={bird.speciesCode}>

                                            <div className="seen-icon"><FaDove/></div>


                                            <div className='bird-name'
                                                 id={`name-${bird.speciesCode}`}>{bird.comName} </div>


                                            <button className="minus_button" onClick={() => minusOne(index)}>-</button>

                                            <div className="bird-count">{bird.count}</div>

                                            <button className="add_button" onClick={() => addOne(index)}>+</button>
                                        </div>
                                    }


                                </>
                            ))}
                        </div>
                    </section>

                </article>

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                       style={customStyle} contentLabel={'Instruction'}>

                    <div id="instruction" className="instruction">
                        <div className="card-title-instruct">Enter birds spotted
                            <button className='modal-close' onClick={closeModal}>X</button>
                        </div>

                        <p className='instruct-text'>When you spot a bird just click the add button
                            for any bird you have previously seen. If you see a flock of birds click on
                            the number to enter in a large number of birds.

                        </p>
                        <p className='instruct-text'>If you made a mistake and clicked on the wrong bird click on the
                            subtract button to remove the bird.</p>
                        <p className='instruct-text'>Click add bird button above if you see a new bird you have never
                            seen before.</p>
                    </div>

                </Modal>
            </div>


        </>
    );
}

export default Session;