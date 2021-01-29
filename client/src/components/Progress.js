import React, {Fragment,useState } from 'react';
import PropTypes from 'prop-types'; // ES6
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Button from 'react-bootstrap/Button';
// import { Button, Alert } from 'react-bootstrap';
// import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



const Progress = ({percentage}) => {
    console.log("percentage: ",percentage);
    return(

        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-success"
                 role="progressbar"
                 style={{width: `${percentage}%`}}

            >
                {percentage}%
            </div>

        </div>

    );
};
// function App() {
//     const greeting = 'Hello Function Component!';
//     return <h1>{greeting}</h1>;
// }


Progress.propTypes ={
    msg: PropTypes.string.isRequired
};
export default Progress;
