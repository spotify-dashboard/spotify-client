import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styles from './global.styles.scss';

import HomeDashboard from './components/HomeDashboard/HomeDashboard/HomeDashboard.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        //bindings


    };

    render() {

        return (
            <Router>
                <Route path="/">
                    <HomeDashboard />
                </Route>
            </Router>
        );
    };
};