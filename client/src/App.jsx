import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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

class App extends React.Component {

    componentDidMount() {

        this.props.loginCheck()

        //check if login was successful
        if (this.props.loginCheck && window.location.href.indexOf("success") > -1) {
            //get profile info
            this.props.fetchProfile();

            //get user's music library tracks
            this.props.fetchMusicLibraryTracks();

            // get current song that user is playing on Spotify
            this.props.fetchCurrentSong();

            //get all user's playlists
            this.props.getAllPlaylists();

            //page change
            this.props.pageChange('/');

            setInterval(() => {
            this.props.fetchCurrentSong(); // check for updated current song
            this.props.loginCheck(); // continually check if access token exists
            }, 5000);

        } 
    }

    componentDidUpdate() {
        
    }

    render() {

        console.log('app', this.props)

        return (
            <div>
                <Route exact path="/" component={HomeDashboard} />
                <Route exact path="/success" component={HomeDashboard} />
                <Route path="/library" component={MusicLibraryPage} />
                <Route path="/account" component={AccountPage} />
            </div>
        );
    };
};

const mapStateToProps = state => ({
    profile: state.profile,
    currentPage: state.pageChange.currentPage,
    isLoggedIn: state.loginCheck.loggedIn.isLoggedIn
});

const mapDispatchToProps = {
    loginCheck,
    fetchProfile,
    fetchMusicLibraryTracks,
    pageChange,
    fetchCurrentSong,
    getAllPlaylists,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));