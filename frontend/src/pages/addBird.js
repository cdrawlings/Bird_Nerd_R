import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Modal from 'react-modal';
import {FaPlus} from 'react-icons/fa'
// import BackButton from "../components/BackButton";
import {createBird, reset} from "../features/bird/birdSlice";
import {getLast} from "../features/last/lastSlice";

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
    const {birds, isSuccess,} = useSelector((state) => state.bird)


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

    const {comName, count, speciesCode, birdid, updated, sessionid, seen} = modal

    const [filtered, setFiltered] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (isSuccess) {
            dispatch(getLast)
            console.log("Last", last)
        }

    }, [isSuccess, dispatch])


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

        const viewed = views.map((bird, i) => {
            if (i === index) {
                const comName = bird.comName
                const count = bird.count
                const speciesCode = bird.speciesCode
                const updated = Date.now()
                const sessionid = params.id
                const seen = true

                const element = {count, sessionid, speciesCode, comName, seen, updated}
                setModal(element)
            }
        });

        setModalIsOpen(true)
    }

    const onChange = (e) => {
        setModal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const views = ebirds;

        console.log("Submitting")

        const resetModal = {
            comName: "",
            count: "",
            speciesCode: "",
            birdid: "",
            updated: "",
            sessionid: "",
            seen: "",
        }

        console.log("new Bird")

        dispatch(createBird(modal))

        console.log("Bird Created")

        dispatch(reset())
        setModal(resetModal)
        // dispatch(addBird(modalData))

        // navigate("/session/" + params.id)

        setModalIsOpen(false)
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
                                                <FaPlus/>
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