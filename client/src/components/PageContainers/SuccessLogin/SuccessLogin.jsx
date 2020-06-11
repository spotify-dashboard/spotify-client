import React, { useEffect } from 'react';
import styles from './successlogin.module.scss';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { debounce, throttle } from 'lodash';

import { fetchProfile } from '../../../actions/profileActions.js';
import { getRecentlyPlayed } from '../../../actions/recentlyPlayedActions.js';
import { fetchMusicLibraryTracks } from '../../../actions/musicLibraryActions.js';
import { pageChange } from '../../../actions/pageChangeActions.js';
import { getAllPlaylists } from '../../../actions/playlistActions.js';
import { loginCheck } from '../../../actions/loginActions.js';
import { setError } from '../../../actions/errorActions.js';
import { breakdownAllPlaylists } from '../../../actions/breakdownActions.js';

const SuccessLogin = props => {

    useEffect(() => {
        // if user is not logged in (login is checked on App comp mount)
        if (props.isLoggedIn === false || props.isLoggedIn === undefined) {
            
            // ==== get data from APIs

            // check login again
            props.loginCheck();
            
            // get profile info
            props.fetchProfile();

            //get all user's playlists
            props.getAllPlaylists();

            // get recently played tracks for charting
            props.getRecentlyPlayed();

            // get aggregate playlist data
            props.breakdownAllPlaylists();

            // change page reference
            props.pageChange('/');
        }
    });

    // history for re-routing
    let history = useHistory();

    // reroutes user to home page after 3 seconds
    let reroute = setTimeout(() => {
        history.push('/');
    }, 10000)

    return (
        <div className={styles.successPageContainer}>
            <div className={styles.successBlurb}>
                <h1>Successfully logged in.</h1>
                <Link to="/">
                    <p>Click here if the page is not re-routed</p>
                </Link>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        profile: state.getProfile.profile,
        loginError: state.loginCheck.error,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    }
};

const mapDispatchToProps = {
    loginCheck,
    fetchProfile,
    getRecentlyPlayed,
    breakdownAllPlaylists,
    fetchMusicLibraryTracks,
    pageChange,
    getAllPlaylists,
    setError
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessLogin);