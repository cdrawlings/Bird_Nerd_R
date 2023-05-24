import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import Modal from 'react-modal';

import {postSeen} from "../features/toggle/toggleSlice";
import {createBird, newBird} from "../features/bird/birdSlice";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import Spinner from "../components/spinner";

/* gets and displays the list of birds. Once a bird is selected
it will be added to the Bird Database

The page will advance to add-bird. There the bird will be added
to the session database and the number of birds
will be added to the cCount database
*/

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

function AddBird() {
    const {last} = useSelector((state) => state.last)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {birds, isSuccess, isLoading} = useSelector((state) => state.bird)
    const {postSuccess} = useSelector((state) => state.toggle)

    const [modalIsOpen, setModalIsOpen] = useState(false)

    // const [items, setItems] = useState([]);
    const [modal, setModal] = useState({
        comName: "",
        speciesCode: "",
        birdid: "",
        count: ""
    })


    const {comName, speciesCode, birdid, count} = modal

    const [filtered, setFiltered] = new useState(ebirds)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16));


    useEffect(() => {
        if (isLoading) {
            <Spinner/>
        }
        if (postSuccess) {
            navigate('/dashboard')
        }
    }, [isLoading, navigate, postSuccess])


    const openModal = (index) => {
        const views = filtered;
        let bId = ObjectId();

        const viewed = views.map((bird, i) => {

            if (i === index) {
                const comName = bird.comName
                const speciesCode = bird.speciesCode
                const sessionid = params.id
                const birdid = bId;

                console.log("Add ID", bId)
                console.log("Name", comName)
                console.log("codee", speciesCode)
                console.log("session", sessionid)

                const element = {sessionid, speciesCode, comName, birdid}

                console.log("Ele", element)

                setModal(element)
                console.log("Opened", modal)
                setModalIsOpen(true)
            }
        });
    }


    // Filter the bird by input
    const filter = (e) => {
        let birdList = document.getElementById('birdlist')

        let value = e.target.value.toLowerCase();


        let upDated = [...ebirds];
        upDated = upDated.filter((bird) => {
            return bird.comName.toLowerCase().search(value) !== -1;
        });
        setFiltered(upDated);
        console.log('f', filtered)
        console.log('e', ebirds)
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

    const closeModal = () => setModalIsOpen(false)

    const onChange = (e) => {
        setModal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Modal', modal)
        dispatch(postSeen(modal))
        dispatch(createBird(modal))
        dispatch(newBird(modal))


        navigate('/session/' + params.id)
    }

    return (
        <>
            <div className="main">
                <section className="session-navbar">
                    <div className="session-nav">
                        <Link to={`/session/${params.id}`} className="finished">Back to bird watchig</Link>
                    </div>
                </section>

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
                                                onClick={() => openModal(index)}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </section>
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
        </>
    )

}

export default AddBird;