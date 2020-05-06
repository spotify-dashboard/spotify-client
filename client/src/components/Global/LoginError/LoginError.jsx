import React from 'react';
import Login from '../../Login/Login.jsx';
import styles from './loginerror.module.scss';

const LoginError = props => {
    return (
        <div className={styles.errorView}>
            <h2>Error connecting to your library, please sign in.</h2>
            <Login />
        </div>
    )
};

export default LoginError;