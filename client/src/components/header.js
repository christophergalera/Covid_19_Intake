import React from 'react';
import { Link } from '@reach/router';

const Header = () => {
    return (
        <div>
            <h1>County Vaccine Registration</h1>
            <Link to="/covid" className= "Link">Home Page</Link>
            <button><Link to="/covid/new">Register Resident</Link></button>
            <button><Link to="/covid/loginreg">Login / Register</Link></button>
            <button><Link to="/covid/loginreg">Log Out</Link></button>
        </div>
    )
}

export default Header;