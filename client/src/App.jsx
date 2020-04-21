import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styles from './global_styles.scss';
import Axios from 'axios';
import { Provider } from 'react-redux';
import store from './store.js';
import { connect } from 'react-redux';
import { fetchProfile } from './actions/profileActions.js';

import HomeDashboard from './components/HomeDashboard/HomeDashboard/HomeDashboard.jsx';

class App extends React.Component {
    // constructor(props) {
    //     super(props);

    //     // this.state = {
    //     //     loggedIn: false,
    //     //     error: null,
    //     //     profile: [],
    //     //     musicLibrary: {
    //     //         tracks: [],
    //     //     },
    //     // };

    //     //bindings
    //     // this.fetchProfile = this.fetchProfile.bind(this);

    // };

    // fetchProfile() {
    //     if (this.state.loggedIn) {
    //         Axios.get('/api/profile/me')
    //             .then(response => {
    //                 this.setState({
    //                     profile: response.data
    //                 }, () => console.log(this.state.profile))
    //             })
    //             .catch(error => {
    //                 this.setState({ error });
    //             });
    //     }
    // };

    fetchMusicLibTracks() {
        if (this.state.loggedIn) {
            Axios.get('/api/user-library/tracks')
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    this.setState({ error })
                });
        }
    }

    componentDidMount() {
        //check if login was successful
        if (window.location.href.indexOf("success") > -1) {
            // this.setState({
            //     loggedIn: true
            // }, this.fetchProfile);
            this.props.fetchProfile();

        } else if (window.location.href.indexOf("error") > 1) {
            // if url contains error, display
            // this.setState({
            //     error: 'Error logging in to your account. Please try again.'
            // })
            this.props.fetchProfile();
        }
    }


    componentDidUpdate() {}

    render() {

        return (
                <Router>
                    <Route path="/">
                        <HomeDashboard
                        //  profile={this.state.profile} 
                         />
                    </Route>
                </Router>
        );
    };
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { fetchProfile })(App);