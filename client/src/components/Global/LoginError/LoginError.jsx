import React from 'react';
import Login from '../../Login/Login.jsx';

const LoginError = props => {
    return (
        <div className="errorView">
            <h2>Error connecting to your library, please sign in.</h2>
            <Login />
        </div>
    )
};

export default LoginError;