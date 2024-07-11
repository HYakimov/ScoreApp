import '../styles/NavBarComponent.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { ChartPage, MainPage, RegistrationFormPage, ScoresFormPage } from '../constants/RouteConstants';

const NavBarComponent = () => {

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to={MainPage}>My App</Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to={ChartPage} >Chart</Link>
                    </li>
                    <li>
                        <Link to={ScoresFormPage} >Scores Form</Link>
                    </li>
                    <li>
                        <Link to={RegistrationFormPage} >Registration Form</Link>
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