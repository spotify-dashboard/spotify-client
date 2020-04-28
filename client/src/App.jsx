import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { debounce, throttle } from 'lodash';
import styles from './global_styles.scss';

// components
import HomeDashboard from './components/PageContainers/HomeDashboard/HomeDashboard/HomeDashboard.jsx';
import MusicLibraryPage from './components/PageContainers/MusicLibrary/MusicLibrary/MusicLibrary.jsx';
import AccountPage from './components/PageContainers/Account/AccountPage/AccountPage.jsx';

// redux
import { connect } from 'react-redux'; // connect to store

//redux actions
import { fetchProfile } from './actions/profileActions.js';
import { fetchMusicLibraryTracks } from './actions/musicLibraryActions.js';
import { pageChange } from './actions/pageChangeActions.js';
import { fetchCurrentSong } from './actions/currentSongActions.js';
import { getAllPlaylists } from './actions/playlistActions.js';
import { loginCheck } from './actions/loginActions.js';
import { setError } from './actions/errorActions.js';

class App extends React.Component {

    componentDidMount() {
        //check if user is logged in
        this.props.loginCheck();

        if (window.location.href.indexOf("success") > -1) {
            //get profile info
            this.props.fetchProfile();

            //get user's music library tracks
            this.props.fetchMusicLibraryTracks();

            // get current song that user is playing on Spotify
            this.props.fetchCurrentSong();

            //get all user's playlists
            this.props.getAllPlaylists();

            this.props.pageChange('/');
        }

        let refresh = setInterval(() => {
            this.props.fetchCurrentSong(); // check for updated current song
        }, 5000);
    }

    render() {

        console.log('app', this.props)
            
        // if (this.props.profileError || this.props.loginError || this.props.allPlaylistsError) {
        //     return (
        //         <div>Error</div>
        //     )
        // } else {
            return (
                <div>
                    <Route exact path="/" component={HomeDashboard} />
                    <Route exact path="/success" component={HomeDashboard} />
                    <Route path="/library" component={MusicLibraryPage} />
                    <Route path="/account" component={AccountPage} />
                </div>
            )
        // }
    };
};

const mapStateToProps = state => ({
    profile: state.getProfile.profile,
    currentPage: state.pageChange.currentPage,
    isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    error: state,
    profileError: state.getProfile.error,
    loginError: state.loginCheck.error,
    allPlaylistsError: state.getAllPlaylists.error,
    // currentSongError: state.getCurrentSong.error

});

const mapDispatchToProps = {
    loginCheck,
    fetchProfile,
    fetchMusicLibraryTracks,
    pageChange,
    fetchCurrentSong,
    getAllPlaylists,
    setError
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));