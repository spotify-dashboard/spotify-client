import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import styles from './global_styles.scss';

// components
import HomeDashboard from './components/PageContainers/HomeDashboard/HomeDashboard/HomeDashboard.jsx';
import MusicLibraryPage from './components/PageContainers/MusicLibrary/MusicLibrary/MusicLibrary.jsx';

// redux
import { connect } from 'react-redux'; // connect to store

//redux actions
import { fetchProfile } from './actions/profileActions.js';
import { fetchMusicLibraryTracks } from './actions/musicLibraryActions.js';



class App extends React.Component {

    componentDidMount() {
        //check if login was successful
        if (window.location.href.indexOf("success") > -1) {
            //get profile info
            this.props.fetchProfile();

            //get user's music library tracks
            this.props.fetchMusicLibraryTracks();

        } else if (window.location.href.indexOf("error") > 1) {
            
            this.props.fetchProfile();
        }
    }

    componentDidUpdate() {}

    render() {

        return (
            <div>
                <Route exact path="/" component={HomeDashboard} />
                <Route exact path="/success" component={HomeDashboard} />
                <Route path="/library" component={MusicLibraryPage} />
            </div>
        );
    };
};

const mapStateToProps = state => ({
    profile: state.profile,

});

export default withRouter(connect(mapStateToProps, { fetchProfile, fetchMusicLibraryTracks })(App));