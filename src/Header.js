import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid position-relative row">
                <div className="col">
                    <NavLink className="navbar-brand " to="/">UserDetailForm</NavLink>
                </div>
                <div className="col-10 position-absolute-start-100">
                    <NavLink className="navbar-brand" to="/userDetails">UserDetails</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Header;