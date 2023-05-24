import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import Modal from 'react-modal';
import {postSeen, reset} from "../features/toggle/toggleSlice";


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faInfo, faMinus, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'

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
    const {birds, isSuccess} = useSelector((state) => state.bird)
    const {session} = useSelector((state) => state.session)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [workingBirds, setWorkingBirds] = useState([])

    const [modal, setModal] = useState({
        comName: "",
        count: "",
        speciesCode: "",
        birdid: "",
        sessionid: "",
    })

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
        setWorkingBirds(viewed)
    }, [setWorkingBirds])

    // Add one to count
    const addOne = (index) => {
        // Counter state is incremented
        const views = workingBirds;
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
        setWorkingBirds(viewed)
    }

    console.log("Birds", workingBirds)

    // Minus one to count
    const minusOne = (index) => {
        // Counter state is incremented
        const views = workingBirds;

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
        setWorkingBirds(viewed)
    }

    // Open the modal and get the data to include for the DB count for multiple birds
    const openModal = (index) => {
        const views = workingBirds;

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

    // Close multiple bird entry Modal
    const closeModal = () => setModalIsOpen(false)


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


    const onChange = (e) => {
        setModal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    // Add multiple birds to
    const onSubmit = (e) => {
        e.preventDefault();

        const views = workingBirds;
        const modalData = {
            comName,
            speciesCode,
            birdid,
            sessionid,
            count
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
    }


    return (
        <>

            <div className="main">


                <section className="session-navbar">
                    <div className="session-nav">
                        <Link to='/dashboard' className="finished">Finished</Link>
                        <Link to={`/add-bird/${params.id}`} className="newbird">New Bird</Link>
                    </div>
                </section>

                <div className="session-main session-open" id='session-open'>

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
                                {workingBirds.map((bird, index) => (
                                    <>
                                        {bird.count <= 0 ?

                                            <div className="bird-counter watch-box-unseen" key={bird.speciesCode}>

                                                <div className="counter-name">
                                                    <div className="seen-icon">

                                                    </div>

                                                    <div className='bird-name'
                                                         id={`name-${bird.speciesCode}`}>{bird.comName}
                                                    </div>
                                                </div>

                                                <div className="counter">


                                                    <div className="bird-count" onClick={() => openModal(index)}>
                                                        {bird.count}
                                                    </div>

                                                    <button className="add_button-seen"
                                                            onClick={() => addOne(index)}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                </div>


                                            </div>
                                            :
                                            <div className="bird-counter watch-box" key={bird.speciesCode}>

                                                <div className="counter-name">
                                                    <div className="seen-icon">
                                                        <FontAwesomeIcon icon={faEye}/>
                                                    </div>

                                                    <div className='bird-name' id={`name-${bird.speciesCode}`}>
                                                        {bird.comName}
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

                                                    <button className="add_button-seen"
                                                            onClick={() => addOne(index)}>
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
                            <button className='modal-close' onClick={closeInstruct}><FontAwesomeIcon
                                icon={faTimes}/>
                            </button>

                        </div>


                        <p className='instruct-text'>When you spot a bird just click the add button
                            for any bird you have previously seen. If you see a flock of birds click on
                            the number to enter in a large number of birds.

                        </p>
                        <p className='instruct-text'>If you made a mistake and clicked on the wrong bird click on
                            the
                            subtract button to remove the bird.</p>
                        <p className='instruct-text'>Click add bird button above if you see a new bird you have
                            never
                            seen before.</p>
                    </div>
                </div>

            </div>


            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                   style={customStyle} contentLabel={'Add multiple birds to Database'}>


                <div id="modal-box" className="modal-box">
                    <button className='modal-close' onClick={closeModal}><FontAwesomeIcon icon={faTimes}/></button>
                    <div className="card-title-modal">How many {modal.comName}s have you spotted?
                    </div>

                    <form className="form-group" onSubmit={onSubmit}>
                        <input type="number"
                               name='count'
                               placeholder={count}
                               className="form-control"
                               onKeyUp={onChange}/>
                        <button className='btn-submit' type='submit'>Submit</button>
                    </form>
                </div>

            </Modal>


        </>
    );

}

export default Session;