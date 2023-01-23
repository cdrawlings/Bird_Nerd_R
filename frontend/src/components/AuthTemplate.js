import React from 'react';
import {Outlet} from "react-router-dom";

function AuthTemplate() {
    return (
        <>
            <div>

                <Outlet/>

            </div>
        </>
    );
}

export default AuthTemplate;