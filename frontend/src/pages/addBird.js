import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import Modal from 'react-modal';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {addBird, createBird} from "../features/bird/birdSlice";
import Spinner from "../components/spinner";
import {postSeen} from "../features/toggle/toggleSlice";

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
        count: "",
        speciesCode: "",
        birdid: "",
        updated: "",
        sessionid: "",
        seen: "",
    })

    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16));

    const {comName, count, speciesCode, birdid, updated, sessionid, seen} = modal

    const [filtered, setFiltered] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (isLoading) {
            <Spinner/>
        }
        if (postSuccess) {
            navigate('/dashboard')
        }
    }, [isLoading, navigate, postSuccess])

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


    const closeModal = () => setModalIsOpen(false)

    const openModal = (index) => {
        const views = ebirds;
        let bId = ObjectId();

        const viewed = views.map((bird, i) => {

            if (i === index) {
                const comName = bird.comName
                const count = bird.count
                const speciesCode = bird.speciesCode
                const sessionid = params.id
                const birdid = bId;
                const _id = bId;


                const element = {count, sessionid, speciesCode, comName, birdid}
                const data = {speciesCode, comName, _id}
                setModal(element)
                dispatch(createBird(data))
                dispatch(addBird(data))
                console.log("_id", _id)
                console.log("Data", data)

                setModalIsOpen(true)
            }
        });
    }


    const onChange = (e) => {
        setModal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(postSeen(modal))
    }

    return (
        <>
            <div className="main">

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
                                                    onClick={() => openModal(index)}>
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