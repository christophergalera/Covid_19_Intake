import React from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';


const Header = (props) => {
    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/logout", {
        },{
            withCredentials:true,
        })
        .then((res) => {
            console.log(res.data);
            navigate('/covid/loginreg');
        })
        .catch(err => {
            console.log(err);
        });
    };

    let username = ""; 
    // add a space after the username if it is not an empty string
    if (props.user.username !== "") {
        username = props.user.username;
    } else {
        username = "visitor";
    }

    return (
        <div>
        <div className= 'NavBar'>
                <h4>County Resident Registration</h4>
                <Link to="/covid" className= "Link">Dashboard</Link>
                <Link to="/covid/new" className= "Link">Register Resident</Link>
                <Link to="/covid/loginreg" className= "Link">Login / Register</Link>
                <button onClick = {(e) => logout(e)} >Log Out</button>
        </div>
        <br/><p>Welcome { username } !</p>
        </div>
    )
}

export default Header;

