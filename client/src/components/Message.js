import React, {Fragment,useState } from 'react';
import PropTypes from 'prop-types'; // ES6
import 'bootstrap/dist/css/bootstrap.min.css';

// import Button from 'react-bootstrap/Button';
import { Button, Alert } from 'react-bootstrap';
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const AlertDismissibleExample = ({Message}) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert
                // variant="danger"
                variant="info"
                onClose={() => setShow(false)}
                dismissible>
                <Alert.Heading>{Message}</Alert.Heading>
                <p>
                    {Message}
                </p>
            </Alert>
        );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

const Message = ({msg}) => {
console.log("msg: ",msg);
    return(

        <div className="alert alert-info
         alert-dismissible fade show" role="alert">
            {msg}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

    );
};
// function App() {
//     const greeting = 'Hello Function Component!';
//     return <h1>{greeting}</h1>;
// }


Message.propTypes ={
    msg: PropTypes.string.isRequired
}
export default Message;
