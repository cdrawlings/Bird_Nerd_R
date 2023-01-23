import React from 'react';
import {Outlet} from "react-router-dom";
import Header from './header'

function ContentTemplate() {
    return (
        <>
            <>
                <div>
                    <Header/>
                    <Outlet/>
                </div>
            </>
        </>
    );
}

export default ContentTemplate;