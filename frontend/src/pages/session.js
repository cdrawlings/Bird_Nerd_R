import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import Modal from 'react-modal';
import {postSeen, reset} from "../features/toggle/toggleSlice";
import {createBird, newBird} from "../features/bird/birdSlice"


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
    const {ebirds} = useSelector((state) => state.ebirds)
    const {session} = useSelector((state) => state.session)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    // const [newBirdModalOpen, setNewBirdModalOpen] = useState(false)

    const [openNewBirdCountModal, setOpenNewBirdCountModal] = useState(false)
    const [filtered, setFiltered] = new useState(ebirds)

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
            const speciesCode = bird.speciesCode
            const birdid = bird._id
            const user = bird.user
            const sessionid = params.id
            const count = bird.count || 0


            const toggle = {birdid, count, sessionid, speciesCode, comName, user}

            return toggle
        })
        setWorkingBirds(viewed)
    }, [setWorkingBirds])


    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16));


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
        const views = birds;

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

    const openNewBirdModal = () => {
        const overlay = document.getElementById('add-overlay')
        const session = document.getElementById('session-content')

        overlay.removeAttribute("class")
        session.removeAttribute("class")
        overlay.setAttribute('class', 'add-new-bird-overlay')
        session.setAttribute('class', 'hidden')

    }

    const closeNewBirdModal = () => {
        const overlay = document.getElementById('add-overlay')
        const session = document.getElementById('session-content')
        console.log('overlay', overlay)
        overlay.removeAttribute("class")
        session.removeAttribute("class")
        overlay.setAttribute('class', 'hidden')
        session.setAttribute('class', 'main')

    }

    // Open the instruct Div
    const openInstruct = (e) => {
        e.preventDefault();
        let element = document.getElementById('instruction')
        element.removeAttribute("class")
        element.setAttribute('class', 'show add-new-bird-overlay')
    }

    // Close the instruct Div
    const closeInstruct = (e) => {
        e.preventDefault();
        let element = document.getElementById('instruction')
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

        const views = birds;
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
                dispatch(newBird(modalData))
                return modalData
            } else {
                // The rest haven't changed
                return bird
            }
        });
    }


    /******** ADD BIRD CODE ***********/

        // Filter the bird by input
    const filter = (e) => {
            let birdList = document.getElementById('birdlist')
            birdList.style.display = 'block'

            let value = e.target.value.toLowerCase();

            let upDated = [...ebirds];
            upDated = upDated.filter((bird) => {
                return bird.comName.toLowerCase().search(value) !== -1;
            });

            setFiltered(upDated);
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

    const closeAddModal = () => setOpenNewBirdCountModal(false)
    // Open the add new bird spotted and add count modal
    const openAddModal = (index) => {
        const views = filtered;
        let bId = ObjectId();


        const viewed = views.map((bird, i) => {
            if (i === index) {
                const comName = bird.comName
                const speciesCode = bird.speciesCode
                const sessionid = params.id
                const _id = bId;
                const birdid = bId
                const count = 0


                const element = {sessionid, speciesCode, count, comName, _id, birdid}


                setModal(element)

                setOpenNewBirdCountModal(true)
            }
        });
    }

    const onAddChange = (e) => {
        setModal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    //Submits the new Bird Data
    const onAddSubmit = (e) => {
        e.preventDefault();

        dispatch(createBird(modal))
        dispatch(postSeen(modal))
        dispatch(newBird(modal))
        setWorkingBirds((prevState) => ([...prevState, modal]))

        closeAddModal()
        reloadComponent()
        closeNewBirdModal()
    }


    return (
        <>

            <div id="session-content" className="main">


                <section className="session-navbar">
                    <div className="session-nav">
                        <Link to='/dashboard' className="finished">Finished</Link>


                        <div className="newbird" onClick={() => openNewBirdModal()}>
                            New Bird
                        </div>
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


            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='overlay-modal'
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


            <div id="add-overlay" className="hidden">
                <section className="session-navbar">
                    <div className="session-nav">

                        <div className="newbird" onClick={() => closeNewBirdModal()}>
                            Back to Bird Watching
                        </div>
                    </div>
                </section>

                <div id="modal-box" className="new-bird-modal-box">
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
                                    {filtered.map((bird, index) => (

                                        <li className='bird-item' key={bird.speciesCode}>
                                            <div className='hidden'>{bird.speciesCode}</div>
                                            <div>{bird.comName}</div>


                                            <button id={bird.speciesCode} className="bird-count"
                                                    onClick={() => openAddModal(index)}>
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </section>


                    <Modal isOpen={openNewBirdCountModal} onRequestClose={closeAddModal}
                           style={customStyle} contentLabel={'Instruction'}>


                        <button className='modal-close' onClick={closeAddModal}>X</button>
                        <div id="modal-box" className="modal-box">
                            <div className="card-title-modal">How many {modal.comName}s have you spotted?
                            </div>

                            <form className="form-group" onSubmit={onAddSubmit}>
                                <input type="number" name='count' placeholder={count} className="form-control"
                                       onChange={onAddChange}/>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>

                    </Modal>
                </div>
            </div>


        </>
    );

}

export default Session;