import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createBird, reset} from "../features/bird/birdSlice";

import {FaPlus} from "react-icons/fa";
import {toast} from 'react-toastify'
import Spinner from '../components/spinner'


/* gets and displays the list of birds. Once a bird is selected
it will be added to the Bird Database

The page will advance to add-bird. There the bird will be added
to the session database and the number of birds
will be added to the cCount database
 */
function FindBird() {
    const {user} = useSelector((state) => state.auth)
    const {ebirds} = useSelector((state) => state.ebirds)

    const {birds, isSuccess, isLoading, isError, message} = useSelector((state) => state.bird)

    const [filtered, setFiltered] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
    function reloadComponent(){
        let filter = document.getElementById('filter')
        let birdList = document.getElementById('birdlist')
        let resetBird = []
        setFiltered(resetBird);

        filter.value = '';
        birdList.style.display = 'none'
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

    }, [dispatch, isError, message])

    useEffect(() => {
        if (isSuccess) {
            navigate('/add-bird')
        }
    }, [isSuccess, navigate])

    if (isLoading) {
        return <Spinner/>
    }

    const getData = (e) => {

        const comName = e.currentTarget.previousElementSibling.previousElementSibling.innerText;
        const speciesCode = e.currentTarget.previousElementSibling.innerText;

        const spotted = {
            comName,
            speciesCode,
        }

        dispatch(createBird(spotted))

        dispatch(reset())
    }





    return (
        <>
            <div className="main">

                <section className="content">

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
                        <button className="reset" onClick={reloadComponent} >Reset</button>
                    </div>
                </section>

                <section>
                    <div className="searchcontainer">
                        <div className="searchbox ">

                            <ul id='birdlist' >
                                {filtered.map((bird) => {
                                    return (

                                        <li  className='bird-item' key={bird.comName}>
                                            <p >{bird.comName}</p>
                                            <p className='hidden'>{bird.speciesCode}</p>
                                            <button id={bird.speciesCode} onClick={getData} className="bird-box"><FaPlus /></button>
                                        </li>

                                    )

                                })}
                            </ul>

                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}

export default FindBird;