import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter, BrowserHistory } from 'react-router';
import { pageChange } from './actions/pageChangeActions.js';
import styles from './global_styles.scss';

// components
import HomeDashboard from './components/PageContainers/HomeDashboard/HomeDashboard/HomeDashboard.jsx';
import MusicLibraryPage from './components/PageContainers/MusicLibrary/MusicLibrary/MusicLibrary.jsx';
import AccountPage from './components/PageContainers/Account/AccountPage/AccountPage.jsx';
import ErrorPage from './components/PageContainers/ErrorPage/ErrorPage.jsx';
import SuccessLogin from './components/PageContainers/SuccessLogin/SuccessLogin.jsx';

// redux
import { connect } from 'react-redux'; // connect to store

//redux actions
import { fetchCurrentSong } from './actions/currentSongActions.js';
import { loginCheck } from './actions/loginActions.js';

class App extends React.Component {
    
    componentDidMount() {
        //check if user is logged in
        this.props.loginCheck();

        // check for updated current song
        let refresh = setInterval(() => {
            this.props.fetchCurrentSong();
        }, 5000);

        // NOTE: all API calls moved to SuccessLogin Page
    }

    // TODO: Handle browser back button click

    // handle back button click
    componentDidUpdate(){    
        window.onpopstate = e => {
            // if page returning to is account
            if (window.location.pathname === '/account') {
                this.props.pageChange('/account');
            } else if (window.location.pathname === '/library') {
                // if page returning to is library
                this.props.pageChange('/playlists');
            } else {
                // else return to home
                this.props.pageChange('/');
            }
        }
      }

    render() {
        
        return (
            <div>
                <Route exact path="/" component={HomeDashboard} />
                <Route exact path="/success" component={SuccessLogin} />
                <Route exact path="/logout/" component={HomeDashboard} />
                <Route path="/library" component={MusicLibraryPage} />
                <Route path="/account" component={AccountPage} />
                <Route path="/error" component={ErrorPage} />
            </div>
        )
    };
};

const mapStateToProps = state => ({
    profile: state.getProfile.profile,
    currentPage: state.pageChange.currentPage,
    isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    profileError: state.getProfile.error,
    loginError: state.loginCheck.error,
    allPlaylistsError: state.getAllPlaylists.error,
    state: state
});

const mapDispatchToProps = {
    loginCheck,
    pageChange,
    fetchCurrentSong,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));