import React, { setState, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useHistory } from "react-router-dom";

function Landing() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    const checkLoggedIn = () => {
        if (localStorage.getItem('jwtToken')) {
            const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('jwtToken');
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        } else {
            setIsLoggedIn(false);
        }
    }

    return (
        <div>
            {checkLoggedIn()}
            {isLoggedIn ? history.push("/home") : history.push("/about")}
        </div>
    )
}

export default Landing;