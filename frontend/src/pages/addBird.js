import React from 'react';
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createBird, reset} from "../features/bird/birdSlice";

import {FaPlus} from "react-icons/fa";
import {toast} from 'react-toastify'
import Spinner from '../components/spinner'

function AddBird() {
    const {user} = useSelector((state) => state.auth)
    const {location} = useSelector((state) => state.location)
    const {ebirds} = useSelector((state) => state.ebirds)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.bird)

    const [filtered, setFiltered] = useState([])
    const [comName, setComName] = useState("")
    const [speciesCode, setSpeciesCode] = useState("")

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


    const getData = (e) => {

        const comName = e.currentTarget.previousElementSibling.previousElementSibling.innerText;
        const speciesCode = e.currentTarget.previousElementSibling.innerText;

        const spotted = {
            comName,
            speciesCode,
            user: user._id
        }

        console.log("Spotted", spotted)
        dispatch(createBird(spotted))

    }





    return (
        <>
            <div className="main-add">

                <section className="content">

                    <h1 className='title'>Add a bird </h1>
                    <p className='add-text'>See a new bird? quickly add it to your viewed birds list.</p>

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

                            <ul id='birdlist' className='content'>
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

export default AddBird;