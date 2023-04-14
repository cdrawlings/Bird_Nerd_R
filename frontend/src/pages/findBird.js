import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import Modal from 'react-modal';
import {createBird} from "../features/bird/birdSlice";
import Spinner from "../components/spinner";
import {postSeen} from "../features/toggle/toggleSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

/* gets and displays the list of birds. Once a bird is selected
it will be added to the Bird Database

The page will advance to add-bird. There the bird will be added
to the session database and the number of birds
will be added to the cCount database
*/

// Custom styles for Modal
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


function FindBird() {
    const {last} = useSelector((state) => state.last)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {birds, isSuccess, isLoading} = useSelector((state) => state.bird)
    const {postSuccess, reset} = useSelector((state) => state.toggle)
    const {location} = useSelector((state) => state.location)

    console.log("Location", location)

    const [modalIsOpen, setModalIsOpen] = useState(false)

    // const [items, setItems] = useState([]);
    const [modal, setModal] = useState({
        comName: "",
        count: "",
        speciesCode: "",
        birdid: "",
        updated: "",
        city: location.city,
        lon: location.lon,
        lat: location.lat,
        sessionid: "",
        //temperature: location.temperature,
        //condition: location.condition,
        //visibility: location.visibility,
        //icon: location.icon,

    })

    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16));

    const {
        comName,
        count,
        speciesCode,
        birdid, updated, sessionid, city, lon, lat
    } = modal

    const [filtered, setFiltered] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (isLoading) {
            <Spinner/>
        }

    }, [isLoading, navigate, reset, postSuccess])


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


    // Creates a new bird entry in the bird DB including name, speciescode and birdID
    const openModal = (index) => {
        const views = ebirds;
        const bId = ObjectId();

        const viewed = views.map((bird, i) => {

            if (i === index) {
                const comName = bird.comName
                const speciesCode = bird.speciesCode
                const sessionid = ObjectId()
                const birdid = bId;
                const _id = bId;


                console.log("bird ID", _id)

                const element = {sessionid, speciesCode, comName, birdid, city, lat, lon}


                const data = {speciesCode, comName, _id}
                console.log("Element", element)
                setModal(element)
                dispatch(createBird(data))
                console.log("Data - new bird", data)

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
        console.log("Modal", modal)
        e.preventDefault();
        dispatch(postSeen(modal))
        navigate('/dashboard');
    }


    return (
        <>
            <div className="main">

                <section className="content">

                    <h1 className='title'>Add a bird </h1>

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

                                        <li className='bird-item' key={bird.speciesCode}>
                                            <div className='hidden'>{bird.speciesCode}</div>
                                            <div>{bird.comName}</div>
                                            <button id={bird.speciesCode} className="bird-count"
                                                    onClick={() => openModal(index)}>
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>
                    </div>
                </section>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                   style={customStyle} contentLabel={'Instruction'}>


                <div id="modal-box" className="modal-box">
                    <div className="modal-header">
                        <div className="card-title-modal">How many {modal.comName}s have you spotted?</div>
                        <button className='modal-close' onClick={closeModal}>X</button>
                    </div>

                    <form className="form-group" onSubmit={onSubmit}>
                        <input type="number" name='count' placeholder={count} className="form-control"
                               onChange={onChange} required/>
                        <button className='btn-submit' type='submit'>Submit</button>
                    </form>
                </div>

            </Modal>
        </>
    )

}

export default FindBird;