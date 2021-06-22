import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {link, navigate} from '@reach/router';

const CovidDetails = (props) => {
    const {id} = props;
    const [covid , setCovid] = useState({});

    useEffect(()=> {
        axios.get("http://localhost:8000/api/covid/" + id,{
            withCredentials:true
        })
        .then((res) => {
            console.log(res.data);
            setCovid(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
    return ( 
        <div>
            <h1>{ covid.firstName } { covid.lastName }</h1>
            <p>
                First Name: {covid.firstName}
            </p>
            <p>
                Last Name: {covid.lastName}
            </p>
            <p>
                Address: {covid.address}
            </p>
            <p>
                Date of Birth: {covid.dateOfBirth}
            </p>
            <p>Phone Number: {covid.phoneNumber}</p>
            <p>Essential Worker: {covid.essentialWorker}</p>
            <p>Describe Essential Work: {covid.describeEssentialWork}</p>
            <p>Disability: {covid.disablity}</p>
        </div>
    )
}

export default CovidDetails;
