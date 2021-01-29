import React from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'

import { faFile, faFileUpload } from '@fortawesome/free-solid-svg-icons'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab,faReact } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

import FileUpload from './components/FileUpload';



const element = <FontAwesomeIcon icon={faFile} />;
const element2 = <FontAwesomeIcon icon={faFileUpload} />;
const element3 = <FontAwesomeIcon icon={faReact}/>;

// const App=()=> <div className="App">
//         app
//     </div>


const App=()=> <div className="container mt-4">
    <h4 className="display-4 text-center mb-4">
         {/*<element/>*/}
        {/*<FontAwesomeIcon icon={faFile} />*/}
        <FontAwesomeIcon icon={faReact}/>
        React File Upload
        {/*<element2/> <element3/>*/}
        {/*<i className="fab fa-react"></i> React File Upload*/}
        <FileUpload/>
    </h4>

</div>

export default App;
