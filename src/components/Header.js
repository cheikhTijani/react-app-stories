import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import logo from '../style/logo.png';

const Header = () => {
    const loggedIn = sessionStorage.getItem('token') ? true : false;
    useEffect(() => {
    }, [loggedIn])
    return (
        <div className="ui centred grid">
            <div className="center aligned column">
                <div className="ui compact menu theMenu">
                    <Link to="/" className="item">
                        <img src={logo} alt="Stories logo" className="ui tiny image logo" />
                    </Link>
                    <div className="right menu flex-center">
                        <Link to="/" className="item font" >All Stories</Link>
                        {!loggedIn && (
                            <Link to="/login" className="ui button primary Btn" >Login</Link>
                        )}
                        {loggedIn && <Link to="/stories/new" className="item font" >New Story</Link>}
                        <GoogleAuth />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Header;