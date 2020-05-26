import React from 'react';
import styles from './errorpage.module.scss';
import { connect } from 'react-redux';

const ErrorPage = () => {

    let removeLocalStorageAndLogin = () => {
        // remove local storage
        window.localStorage.removeItem('state');
    }

    return (
        <div className={styles.parentContainer}>
            <h1>Error</h1>
            <a href="/login">
                <p onClick={() => removeLocalStorageAndLogin()}>
                    Click here to refresh and try again.
                </p>
            </a>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    }
};

export default connect(mapStateToProps)(ErrorPage);