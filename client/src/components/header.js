import React from 'react';
import { Link } from '@reach/router';

const Header = () => {
    return (
        <div>
            <h1>Insert Header Title</h1>
            <Link to="/covid/new">Register Resident</Link>
        </div>
    )
}

export default Header;