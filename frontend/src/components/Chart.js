import React from 'react';
import LastSession from "./LastSession";

function Chart() {


    console.log("Chart last", last)


    return (
        <>

            <div className="last-container">


                <p className="card-title">Last bird watching session</p>
                <LastSession data={last} keys={keys}/>


            </div>

        </>
    );
}

export default Chart;