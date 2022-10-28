import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import dayjs from 'dayjs';


function Home() {
    const {user} = useSelector((state) => state.auth)
    const {location} = useSelector((state) => state.location)
    const {ebirds} = useSelector((state) => state.ebirds)


    const created = dayjs(user.createdAt).format('dddd, MMMM D, YYYY')
    const updated = dayjs(user.updatedAt).format('dddd, MMMM D, YYYY')


    return (
        <>
            <section>
                <h3>Dashboard</h3>
            </section>
            <section>
                <h1 id="user">User: {user.firstname} {user.lastname}</h1>
                <h2 id="location">Location: {location.city}</h2>
                <div id="weather">Weather</div>
                <div id="seen">Seen</div>
                <div id="seen">Created account: {created}</div>
                <div id="seen">last Loggin: {updated}</div>

                <div id="session">Start Session</div>
                <div id="last_session">Last Session</div>
            </section>
            <section>
                <h1 >Add a bird</h1>
                <Link to="/find-bird">
                    <button>Add</button>
                </Link>
            </section>
        </>
    );
}

export default Home;