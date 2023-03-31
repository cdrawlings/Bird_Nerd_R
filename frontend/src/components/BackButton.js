import React from 'react';
import {Link} from "react-router-dom"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleArrowLeft} from '@fortawesome/free-solid-svg-icons'


const BackButton = ({url}) => {

    return (
        <Link to={url} className="btn-back">
            <div className="back-icon"><FontAwesomeIcon icon={faCircleArrowLeft}/></div>
            Back
        </Link>
    );
}

export default BackButton;