import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import CovidForm from './CovidForm';
import io from 'socket.io-client';

const NewCovid = (props) => {
  // sockets will NEVER use the setter, so we can ignore it!!
  const [ socket ] = useState( () => io(":8000") );

  const [ newCovid, setNewCovid ] = useState({
    firstName: "",
    lastName: "",
    address: "",
    dateOfBirth: "",
    phoneNumber: "",
    essentialWorker: true,
    describeEssentialWork: "",
    disablity: false,
  })
  const [ errors, setErrors ] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/covid', newCovid)
      .then((res) => {
        console.log(res.data);

        // tell the server that we successfully created a new hero!
        socket.emit("added_covid", res.data);
        
        // make sure you clean up after yourself - do NOT leave a socket connected
        socket.disconnect();

        navigate("/covid");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setErrors(err.response.data.errors);
      })
  }

  return (
    <div>
      <h1>Register Resident</h1>
      <CovidForm 
        submitHandler={ submitHandler } 
        errors={ errors } 
        covid={ newCovid } 
        setCovid={ setNewCovid }
        buttonLabel={"Create Resident"}
        />
    </div>
  )
}

export default NewCovid;