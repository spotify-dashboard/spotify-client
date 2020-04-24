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



class App extends React.Component {

    componentDidMount() {
        //check if login was successful
        if (window.location.href.indexOf("success") > -1) {
            //get profile info
            this.props.fetchProfile();

            //get user's music library tracks
            this.props.fetchMusicLibraryTracks();

            // get current song that user is playing on Spotify
            this.props.fetchCurrentSong();

            //page change
            this.props.pageChange('/');

            // check for updated current song
            setInterval(() => {
            this.props.fetchCurrentSong();
            }, 5000);

        } else if (window.location.href.indexOf("error") > 1) {
            
            this.props.fetchProfile();

        }
    }

    componentDidUpdate() {
        
    }

    render() {

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
    currentPage: state
});

const mapDispatchToProps = {
    fetchProfile, 
    fetchMusicLibraryTracks,
    pageChange,
    fetchCurrentSong
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));