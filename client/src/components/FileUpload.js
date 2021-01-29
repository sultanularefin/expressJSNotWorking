import React, {Fragment,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Button from 'react-bootstrap/Button';
import { Button,InputGroup,FormControl } from 'react-bootstrap';
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Message from './Message';
import Progress from './Progress';

import axios from 'axios';
const FileUpload = () => {

    const [file,setFile] =useState('');
    const [filename, setFilename] = useState("Choose File");
    const [uploadedFile, setUploadedFile] =useState({});
    const [message, setMessage] =useState('');
    const [uploadPercentage,setUploadPercentage] =useState(0);

    const onChange=e=>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e =>{
        e.preventDefault();

        // The event.preventDefault() method stops the default action of an element from happening.
        //     For example: Prevent a submit button from submitting a form.
        //     Prevent a link from following the URL.
        const formData = new FormData();

        // The FormData interface provides a
        // way to easily construct a set of key/value
        // pairs representing form fields and their
        // values, which can then be easily sent using
        // the XMLHttpRequest.send() method. It uses
        // the same format a form would use if the
        //     encoding type were set to "multipart/form-data".
        formData.append('file',file);


        // since we have our proxy in package.json we don't have to add' +
        // localhost/3001/upload
        // proxy not working on this version of create react app.
        //localhost/3001
        try{
            const res = await axios.post('http://localhost:3001/upload', formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                },onUploadProgress:progressEvent => {
                    setUploadPercentage(parseInt(Math.round(
                        progressEvent.loaded * 100)/
                        progressEvent.total));

                    setTimeout(()=> setUploadPercentage(0),10000);
                }

                // clear percentage



            });
            setTimeout(()=> setUploadPercentage(0),10000);
            const  {fileName, filePath} =res.data;

            setUploadedFile({fileName,filePath});

            setMessage('File Uploaded');
        }
        catch(err){

            console.log("________err_________: ",err);
            if(err.response.status===500){
                console.log("There was a problem with the server");
                // setMessage('There was a problem with the server');
            }

            else{
                console.log(err.response.data.msg);
                // setMessage(err.response.data.msg);
            }
        }
    };

    return(

        <Fragment>

            {message? <Message msg={message}/>:null}

            <form onSubmit={onSubmit}>

                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>

                            <InputGroup.Text style={{fontSize:'1rem', border:'none',padding:'0',margin:'0'}}>

                                <input type="file"

                                       className="custom-file-input"
                                       id="customFile"
                                       onChange={onChange}
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                >
                                    {/*Choose file*/}
                                    {filename}
                                </label>

                            </InputGroup.Text>

                        </InputGroup.Prepend>



                    </InputGroup>
                </div>


                <Progress percentage={uploadPercentage}/>
                <input
                    type="submit"
                       value="Upload"
                    className="btn btn-primary btn-block mt-4"
                />
            </form>

            {uploadedFile ? <div className="row mt-5">

                <div className="col-md-6 m-auto">

                    <h3 className="text-center">
                        {uploadedFile.fileName}
                    </h3>
                    <img style={{width:'100%'}}
                         src={uploadedFile.filePath} alt=""/>
                </div>

            </div> :null

            }


        </Fragment>
    );
};
// function App() {
//     const greeting = 'Hello Function Component!';
//     return <h1>{greeting}</h1>;
// }
export default FileUpload;
