import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import CovidForm from './CovidForm';

const EditCovid = (props) => {
    const { id } = props;

    const [ editCovid, setEditCovid ] = useState({
        firstName: "",
        lastName: "",
        address: "",
        dateOfBirth: "",
        phoneNumber: "",
        essentialWorker: "",
        describeEssentialWork: "",
        disability: "",
    });

  const [ errors, setErrors ] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/covid/" + id, {
      withCredentials:true
    })
      .then((res) => {
        console.log(res.data);
        setEditCovid(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/covid");
      })
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios.put('http://localhost:8000/api/covid/' + id, editCovid,{
      withCredentials:true
    })
      .then((res) => {
        console.log(res.data);
        // go to the details page when it is successful
        navigate("/covid/" + id);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setErrors(err.response.data.errors);
      })
  }

  const deleteCovid = () => {
    axios.delete('http://localhost:8000/api/covid/' + id,{
      withCredentials:true
    })
      .then((res) => {
        console.log(res.data);
        navigate('/covid');
      })
      .catch((err) => {
        console.log(err);
        navigate('/covid');
      })
  }
 
  return (
    <div>
      <h1>Edit Resident Intake</h1>
      <CovidForm 
        submitHandler={ submitHandler } 
        errors={ errors } 
        covid={ editCovid } 
        setCovid={ setEditCovid }
        buttonLabel={"Update Resident"}
        />
      {/* Both of these are the same...just different syntax! */}
      {/* <button className="deleteBtn" onClick={ () => deleteCovid() }>Delete Hero</button> */}
      <button className="deleteBtn" onClick={ deleteCovid }>Delete Resident Entry</button>
      {/* the following will NOT work!! */}
      {/* <button className="deleteBtn" onClick={ deleteCovid() }>Delete Hero</button> */}
    </div>
  )
}

export default EditCovid;
