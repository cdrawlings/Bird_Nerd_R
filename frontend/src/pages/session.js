import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllBird} from "../features/bird/birdSlice";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import {FaPlus} from "react-icons/fa";


function Session() {
    const {user} = useSelector((state) => state.auth)
    const {session} = useSelector((state) => state.session)
    const {birds} = useSelector((state) => state.bird)

    const [formData, setFormData] = useState({
        comName: '',
        speciesCode: '',
        count: '',
        user: '',
        session: ''
    })

    const {firstname, lastname, email, password, password2,} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
            dispatch(getAllBird())
        }, [dispatch]
    )


    const addOne = (e) => {

    }


    return (
        <>
            <div className="main">

                <article className="content">
                    <BackButton url='/dashboard'/>

                    <section>
                        <h2>Bird Watching </h2>z
                    </section>


                    <section>
                        <h2>Birds this session </h2>

                        <p>Session city: {session.city}</p>
                        <p>Session Latitude: {session.lat}</p>
                        <p>Session Lon: {session.lon}</p>

                    </section>


                    <h4>Seen Birds</h4>

                    <ul className='allBirds'>
                        {birds.map((bird) => {
                            return (
                                <div className="sessionList" key={bird.speciesCode}>
                                    <div className='' id={`name-${bird.speciesCode}`}>{bird.comName} </div>
                                    <div className='hidden' id={bird.speciesCode}>{bird.speciesCode} </div>
                                    <div className='hidden' id={bird._id}>{bird._id} </div>
                                    <div className="sessionCounter">
                                        <button className="bird-box plus" onClick={addOne}><FaPlus/></button>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>

                </article>
            </div>


        </>
    );
}

export default Session;