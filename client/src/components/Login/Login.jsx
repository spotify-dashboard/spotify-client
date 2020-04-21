import React from 'react';
import styles from './login.module.scss';

const Login = props => {
    return (
        <div className="loginModule">
            <a href="/login/">
                <button id={styles.loginBtn}>Log in with Spotify</button>
            </a>
        </div>
    )
};

export default Login;