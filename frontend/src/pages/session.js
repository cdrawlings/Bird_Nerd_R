import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Modal from 'react-modal';
import BackButton from "../components/BackButton";
import {postSeen, reset} from "../features/toggle/toggleSlice";
import {addBird} from "../features/addBird/addBirdSlice";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBinoculars, faDove, faInfo, faMinus, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'

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
    const {ebirds} = useSelector((state) => state.ebirds)
    const {session} = useSelector((state) => state.session)
    const {birds, isSuccess} = useSelector((state) => state.bird)

    const [sessionBirds, setSessionBirds] = useState([])
    const [filtered, setFiltered] = useState([])

    const [modal, setModal] = useState({
        comName: "",
        count: "",
        speciesCode: "",
        birdid: "",
        sessionid: "",
    })

    // Modal states
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalForNew, setModalForNew] = useState(false)

    const {comName, count, speciesCode, birdid, sessionid} = modal

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()


    // Add a count element and set birds to sessionBirds
    useEffect(() => {

        const viewed = birds.map((bird) => {
            const comName = bird.comName
            const count = 0
            const speciesCode = bird.speciesCode
            const birdid = bird._id
            const user = bird.user
            const sessionid = params.id

            const toggle = {birdid, count, sessionid, speciesCode, comName, user}

            return toggle
        })
        setSessionBirds(viewed)

    }, [setSessionBirds])

    // Create a MongoDB like _Id
    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16));

    // Add one to count
    const addOne = (index) => {
        // Counter state is incremented
        const views = sessionBirds;
        const viewed = views.map((bird, i) => {
            if (i === index) {
                // Increment the clicked counter
                const comName = bird.comName
                const count = bird.count + 1
                const speciesCode = bird.speciesCode
                const birdid = bird.birdid
                const sessionid = params.id

                const toggle = {birdid, count, sessionid, speciesCode, comName}
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
                const sessionid = params.id

                const toggle = {birdid, count, sessionid, speciesCode, comName}


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

    // Open the modal and get the data to include for the DB count
    const openModal = (index) => {
        const views = sessionBirds;

        const viewed = views.map((bird, i) => {
            if (i === index) {
                const comName = bird.comName
                const count = bird.count
                const speciesCode = bird.speciesCode
                const birdid = bird.birdid
                const sessionid = params.id

                const element = {birdid, count, sessionid, speciesCode, comName}

                setModal(element)
            }
        });
        setModalIsOpen(true)
    }

    const openNewModal = (index) => {
        const newId = ObjectId()

        const viewed = ebirds.map((bird, i) => {
            if (i === index) {
                const comName = bird.comName
                const speciesCode = bird.speciesCode
                const birdid = newId
                const sessionid = params.id

                const element = {birdid, sessionid, speciesCode, comName}
                setModal(element)
            }
        });
        setModalForNew(true)
    }


    // Open the instruct Div
    const openInstruct = (e) => {
        e.preventDefault();
        console.log("instructions")
        let element = document.getElementById('instruction')
        console.log('Element', element)
        element.removeAttribute("class")
        element.setAttribute('class', 'show instruction')
    }

    // Close the instruct Div
    const closeInstruct = (e) => {
        e.preventDefault();
        console.log("instructions")
        let element = document.getElementById('instruction')
        console.log('Element', element)
        element.removeAttribute('class')
        element.setAttribute('class', 'hidden')
    }

    // Close multiple bird entry Modal
    const closeModal = () => setModalIsOpen(false)

    // Open & Close Add new bird modal
    const openNewBird = (e) => {
        e.preventDefault();
        let session = document.getElementById("session-open")
        let sesButton = document.getElementById("new-open")
        let spot = document.getElementById("new-bird")
        let spotButton = document.getElementById("spot-close")
        session.style.display = "none"
        sesButton.style.display = "none"
        spot.style.display = "block"
        spotButton.style.display = "block"
    }

    const closeNewBird = (e) => {
        e.preventDefault();
        let session = document.getElementById("session-open")
        let sesButton = document.getElementById("new-open")
        let spot = document.getElementById("new-bird")
        let spotButton = document.getElementById("spot-close")
        session.style.display = "block"
        sesButton.style.display = "block"
        spotButton.style.display = "none"
        spot.style.display = "none"
    }

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


    function onChange(e) {
        setModal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    // Add multiple birds to
    const onSubmit = (e) => {
        e.preventDefault();

        const views = sessionBirds;
        const modalData = {
            comName,
            speciesCode,
            birdid,
            sessionid,
        }

        const resetModal = {
            comName: "",
            count: "",
            speciesCode: "",
            birdid: "",
            sessionid: "",
        }

        const viewed = views.map((bird) => {
            if (birdid === bird.birdid) {
                dispatch(postSeen(modalData))
                return modalData
            } else {
                // The rest haven't changed
                return bird
            }
        });

        setSessionBirds(viewed)
        setModal(resetModal)
        setModalIsOpen(false)
    }

    const onSubmitNew = (e) => {
        e.preventDefault();

        const modalData = {
            comName: modal.comName,
            speciesCode: modal.speciesCode,
            count: parseInt(count),
            birdid: modal.birdid,
            sessionid: params.id,
            user
        }

        const resetModal = {
            comName: "",
            count: "",
            speciesCode: "",
            birdid: "",
            sessionid: "",
        }

        dispatch(addBird(modalData))

        console.log('ADD NEW START')

        setSessionBirds((prevState) => ([...prevState, modalData]))

        console.log('Modal data', modal)
        console.log('Session Birds', sessionBirds)

        setModal(resetModal)
        reloadComponent()

        closeNewBird(e)
        setModalForNew(false)
    }

    const addNew = (modalData) => {
        console.log('ADD NEW START')
        setSessionBirds([...sessionBirds, modalData]);
    }


    return (
        <>
            <div className="main">

                <div className="session-main session-open" id='session-open'>

                    <div className="second-nav new-open" id='new-open'>
                        <div className="nav-sec">
                            <BackButton url='/dashboard'/>

                            <button className='btn-new-bird' onClick={openNewBird}>
                                <div className="new-birdbtn-text">New</div>
                                <div className="new-birdbtn-icon"><FontAwesomeIcon icon={faDove}/></div>
                                <div className="new-birdbtn-text">Bird</div>
                            </button>
                        </div>
                    </div>

                    <article className="session-space">
                        <section className="session-container">

                            <div className="session-header">
                                <h1 className='title session-heading'>Bird watching in {session.city}</h1>

                                <button className="info" id="info" onClick={openInstruct}>
                                    <span className="info-icon"><FontAwesomeIcon icon={faInfo}/></span>
                                </button>
                            </div>

                            <h4 className='session-title'>Previously spotted birds</h4>

                            <div className='allBirds sessionList'>
                                {sessionBirds.map((bird, index) => (
                                    <>
                                        {bird.count <= 0 ?

                                            <div className="bird-counter watch-box-unseen" key={bird.speciesCode}>

                                                <div className="unseen-icon"></div>

                                                <div className='bird-name'
                                                     id={`name-${bird.speciesCode}`}>{bird.comName} </div>

                                                <button className="minus_button"
                                                        onClick={() => minusOne(index)}></button>

                                                <div className="bird-count"
                                                     onClick={() => openModal(index)}>{bird.count}</div>

                                                <button className="add_button" onClick={() => addOne(index)}>
                                                    <FontAwesomeIcon icon={faPlus}/></button>
                                            </div> : <div className="bird-counter watch-box" key={bird.speciesCode}>

                                                <div className="counter-name">
                                                    <div className="seen-icon">
                                                        <FontAwesomeIcon icon={faBinoculars}/>
                                                    </div>

                                                    <div className='bird-name'
                                                         id={`name-${bird.speciesCode}`}>{bird.comName}
                                                    </div>
                                                </div>

                                                <div className="counter">
                                                    <button className="minus_button-seen"
                                                            onClick={() => minusOne(index)}>
                                                        <FontAwesomeIcon icon={faMinus}/>
                                                    </button>

                                                    <div className="bird-count" onClick={() => openModal(index)}>
                                                        {bird.count}
                                                    </div>

                                                    <button className="add_button-seen" onClick={() => addOne(index)}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                </div>

                                            </div>
                                        }
                                    </>
                                ))}
                            </div>
                        </section>
                    </article>

                    <div id="instruction" className="instruction hidden">
                        <div className="modal-header">
                            <div className="card-title-instruct">Enter birds spotted</div>
                            <button className='modal-close' onClick={closeInstruct}><FontAwesomeIcon icon={faTimes}/>
                            </button>

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
                </div>


                <div className='add-bird-session new-bird' id='new-bird'>

                    <div id='spot-close' className="second-nav spot-close">
                        <div className="nav-sec">
                            <BackButton url='/dashboard'/>

                            <button className='btn-new-bird' onClick={closeNewBird}>

                                <div className="new-birdbtn-icon"><FontAwesomeIcon icon={faTimes}/></div>

                            </button>
                        </div>
                    </div>


                    <div className="card-title-modal">Add a new bird</div>

                    <section className="content find-top-add">

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
                                    {filtered.map((bird, index) => {
                                        return (

                                            <div className='bird-item' key={bird.speciesCode}>
                                                <div className='hidden'>{bird.speciesCode}</div>
                                                <div>{bird.comName}</div>
                                                <button id={bird.speciesCode} className="bird-count"
                                                        onClick={() => openNewModal(index)}>
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </ul>

                            </div>
                        </div>
                    </section>


                </div>


            </div>


            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                   style={customStyle} contentLabel={'Add multiple birds to Database'}>

                <button className='modal-close' onClick={closeModal}>X</button>
                <div id="modal-box" className="modal-box">
                    <div className="card-title-modal">How many {modal.comName}s have you spotted?
                    </div>

                    <form className="form-group" onSubmit={onSubmit}>
                        <input type="number" name='count' placeholder={count} className="form-control"
                               onChange={onChange}/>
                        <button type='submit'>Submit</button>
                    </form>
                </div>

            </Modal>

            <Modal isOpen={modalForNew} onRequestClose={closeModal}
                   style={customStyle} contentLabel={'Add bird count to database'}>

                <button className='modal-close' onClick={closeModal}>X</button>
                <div id="modal-box" className="modal-box">
                    <div className="card-title-modal">How many {modal.comName}s have you spotted?
                    </div>

                    <form className="form-group" onSubmit={onSubmitNew}>
                        <input type="number" name='count' placeholder={count} className="form-control"
                               onChange={onChange}/>
                        <button type='submit'>Submit</button>
                    </form>
                </div>

            </Modal>


        </>
    );
}

export default Session;