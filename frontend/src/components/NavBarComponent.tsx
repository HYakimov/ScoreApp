import '../styles/NavBarComponent.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormPage, MainPage } from '../constants/RouteConstants';

const NavBarComponent = () => {

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to={MainPage}>My App</Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to={FormPage} >Form</Link>
                    </li>
                    <li>
                        <Link to={MainPage} >Table</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBarComponent;