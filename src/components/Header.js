import React from 'react';
import logo from '../images/Mesto.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <>
            <header className="header">
                <img className="header__logo" src={logo} alt="Место" />
                <div className="header__profile">
                    {props.children}
                    <Link to={props.sign} onClick={props.handleLogout} className="header__link">{props.signLink}</Link>
                </div>
            </header>
        </>
    )
}

export default Header