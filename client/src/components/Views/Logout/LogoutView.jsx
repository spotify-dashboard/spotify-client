import React from 'react';
import styles from './logoutview.module.scss';
import { connect } from 'react-redux';
import { pageChange } from '../../../actions/pageChangeActions.js';
import { Link } from 'react-router-dom';

import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../NavItems.js';

const LogoutView = props => {

    console.log('overview comp props', props)

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={dashboardNavItems} />
                
                <div>
                    <h2>Successfully logged out.</h2>
                    <p>View the project on <a className="link-green" href="https://github.com/spotify-dashboard" target="_blank">Github</a></p>
                </div>
                
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.pageChange.currentPage,
    };
};
const mapDispatchToProps = {
    pageChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);