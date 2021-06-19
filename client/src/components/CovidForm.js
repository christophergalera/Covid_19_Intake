import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import CovidDetails from './CovidDetails';

const CovidForm = (props) => {
  const { submitHandler, errors, covid, setCovid, buttonLabel } = props;

  const describeEssentialWork = [ "Military", "Healthcare Worker","Resturant Worker" ];

  const inputChange = (e) => {
    // console.log("input name: " + e.target.name);
    const inputName = e.target.name;
    // console.log("input value: " + e.target.value);
    const inputValue = e.target.value;

    // creates a copy of the entire covid object and puts the copy in updatedCovid
    let updatedCovid = { ...covid };
    updatedCovid[inputName] = inputValue;

    setCovid(updatedCovid);
  }



  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>First Name</label>
          {
            // this is checking to see if the key exists inside of the errors state object
            //    if it exists, show the error, else show nothing
            errors.firstName ? 
              <span className="error-text">  { errors.firstName.message }</span>
              : null
          }
          <input 
            type="text"
            name="firstName"
            value={ covid.firstName }
            onChange={ (e) => inputChange(e) }
            />
        </div>
        <div>
        <label>Last Name</label>
          {
            // this is checking to see if the key exists inside of the errors state object
            //    if it exists, show the error, else show nothing
            errors.lastName ? 
              <span className="error-text">  { errors.lastName.message }</span>
              : null
          }
          <input 
            type="text"
            name="lastName"
            value={ covid.lastName }
            onChange={ (e) => inputChange(e) }
            />
        </div>
        <div>
          <label>Address</label>
          {
            // this is checking to see if the key exists inside of the errors state object
            //    if it exists, show the error, else show nothing
            errors.address ? 
              <span className="error-text">  { errors.address.message }</span>
              : null
          }
          <input 
            type="text"
            name="address"
            value={ covid.address }
            onChange={ (e) => inputChange(e) }
            />
        </div>
        <div>
          <label>Date of Birth</label>
          {
            // this is checking to see if the key exists inside of the errors state object
            //    if it exists, show the error, else show nothing
            errors.dateOfBirth ? 
              <span className="error-text">  { errors.dateOfBirth.message }</span>
              : null
          }
          <input 
            type="text"
            name="dateOfBirth"
            value={ covid.dateOfBirth }
            onChange={ (e) => inputChange(e) }
            />
        </div>
        <div>
          <label>Phone Number</label>
          {
            // this is checking to see if the key exists inside of the errors state object
            //    if it exists, show the error, else show nothing
            errors.phoneNumber ? 
              <span className="error-text">  { errors.phoneNumber.message }</span>
              : null
          }
          <input 
            type="text"
            name="phoneNumber"
            value={ covid.phoneNumber }
            onChange={ (e) => inputChange(e) }
            />
        </div>
        <div>
          <label>Essential Worker </label>
          <input 
            type="text"
            name="essentialWorker"
            value={ covid.essentialWorker }
            onChange={ (e) => inputChange(e) }
            />
        </div>
        <div>
          <label>Describe Essential Work</label>
          <select
            name="describeEssentialWork"
            value={ covid.describeEssentialWork }
            onChange={ (e) => inputChange(e) }
            >
            {
              describeEssentialWork.map((describeEssentialWork, index) => (
                <option value={describeEssentialWork} key={index}>{describeEssentialWork}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label>Disablity </label>
          <input 
            type="text"
            name="disability"
            value={ covid.disability }
            onChange={ (e) => inputChange(e) }
            />
        </div>
        <button>{ buttonLabel }</button>
        {/* <button className="cancelBtn" onClick={() => navigate('/covid')}>Cancel</button> */}
        <button className="cancelBtn" onClick={() => navigate( -1 )}>Cancel</button>
      </form>
    </div>
  )
}

export default CovidForm;
