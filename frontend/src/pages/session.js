import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Modal from 'react-modal';
import BackButton from "../components/BackButton";
import {getAllBird} from "../features/bird/birdSlice";
import {postSeen, reset} from "../features/toggle/toggleSlice";
import {FaBinoculars, FaDove, FaInfo} from "react-icons/fa";


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
    const [sessionBirds, setSessionBirds] = useState([])
    const [modal, setModal] = useState({
        comName: "",
        count: "",
        speciesCode: "",
        birdid: "",
        updated: "",
        sessionid: "",
        seen: "",

    })

    const {comName, count, speciesCode, birdid, updated, sessionid, seen} = modal

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

                return toggle
            })
            setSessionBirds(viewed)
        }
    }, [isSuccess, setSessionBirds])

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
                const updated = Date.now()
                const sessionid = params.id
                const seen = true

                const toggle = {birdid, count, sessionid, speciesCode, comName, seen}
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

    // OPen the modal ang get the dat to inclde for the DB count
    const openModal = (index) => {
        const views = sessionBirds;

        const viewed = views.map((bird, i) => {
            if (i === index) {
                const comName = bird.comName
                const count = bird.count
                const speciesCode = bird.speciesCode
                const birdid = bird.birdid
                const updated = Date.now()
                const sessionid = params.id
                const seen = true

                const element = {birdid, count, sessionid, speciesCode, comName, seen, updated}

                setModal(element)
                console.log("Modal", element)

            }
        });
        setModalIsOpen(true)
    }

    const openInstruct = (e) => {
        e.preventDefault();
        console.log("instructions")
        let element = document.getElementById('instruction')
        console.log('Element', element)
        element.removeAttribute("class")
        element.setAttribute('class', 'show instruction')
    }

    const closeInstruct = (e) => {
        e.preventDefault();
        console.log("instructions")
        let element = document.getElementById('instruction')
        console.log('Element', element)
        element.removeAttribute('class')
        element.setAttribute('class', 'hidden')
    }
// open/ close Modal

    const closeModal = () => setModalIsOpen(false)

    const addBirdNav = () => {
        navigate('/add-bird/' + params.id)
    }

    function onChange(e) {
        setModal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const views = sessionBirds;
        const modalData = {
            comName,
            speciesCode,
            count: parseInt(count),
            updated,
            birdid,
            sessionid,
            seen: true
        }
        const resetModal = {
            comName: "",
            count: "",
            speciesCode: "",
            birdid: "",
            updated: "",
            sessionid: "",
            seen: "",
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


    return (
        <>

            <div className="main">
                <div className="second-nav">
                    <div className="nav-sec">
                        <BackButton url='/dashboard'/>

                        <button className='btn-new-bird' onClick={addBirdNav}>
                            <div className="new-birdbtn-text">New</div>
                            <div className="new-birdbtn-icon"><FaDove/></div>
                            <div className="new-birdbtn-text">Bird</div>
                        </button>
                    </div>
                </div>

                <article className="session-space">


                    <section className="session-container">

                        <h1 className='title find-top session-heading'>Bird watching in aaaaa huala
                            lumpr {session.city}</h1>

                        <button className="info" id="info" onClick={openInstruct}><FaInfo/></button>

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

                                            <div className="bird-count"
                                                 onClick={() => openModal(index)}>{bird.count}</div>

                                            <button className="add_button" onClick={() => addOne(index)}>+</button>
                                        </div> :

                                        <div className="bird-item watch-box" key={bird.speciesCode}>

                                            <div className="seen-icon">< FaBinoculars/></div>


                                            <div className='bird-name'
                                                 id={`name-${bird.speciesCode}`}>{bird.comName} </div>


                                            <button className="minus_button" onClick={() => minusOne(index)}>-</button>

                                            <div className="bird-count"
                                                 onClick={() => openModal(index)}>{bird.count}</div>

                                            <button className="add_button" onClick={() => addOne(index)}>+</button>
                                        </div>
                                    }


                                </>
                            ))}
                        </div>
                    </section>

                </article>

                <div id="instruction" className="instruction hidden">
                    <div className="card-title-instruct">Enter birds spotted
                        <button className='modal-close' onClick={closeInstruct}>X</button>
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

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                       style={customStyle} contentLabel={'Instruction'}>


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
            </div>


        </>
    );
}

export default Session;