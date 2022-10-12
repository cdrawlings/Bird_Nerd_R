import React from 'react';

function Home() {
    return (
        <>
            <section>
                <h1>Home</h1>
            </section>
            <section>
                <div id="weather">Weather</div>
                <div id="location">Location</div>
                <div id="seen">Seen</div>
                <div id="session">Start Session</div>
                <div id="last_session">Last Session</div>
            </section>
        </>
    );
}

export default Home;