import React from 'react';
import styles from './overview.module.scss';
import { connect } from 'react-redux';
import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../NavItems.js';

const OverviewView = props => {

    console.log('overview comp props', props)

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={dashboardNavItems} />
                <h1>Overview</h1>
                <div className={styles.summary}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget quam eget ligula fringilla laoreet. Duis semper nulla eget ante mollis aliquet. Donec iaculis eleifend mollis. Nam in ornare augue. Proin in bibendum arcu, eget tincidunt urna. Curabitur a quam nibh. Morbi eget mattis lectus, eu pulvinar mauris. Integer convallis ex a orci rhoncus commodo. Morbi at erat vestibulum mi dictum luctus. Donec nunc elit, egestas quis finibus id, consequat in tellus. Praesent condimentum erat eu ex dignissim, sit amet blandit tellus consequat. Vivamus ac ante id orci euismod congue. Vivamus consectetur eros eu justo varius lobortis. Curabitur a enim nulla. Cras at tellus consectetur diam egestas fringilla ut eu urna.</p>
                </div>
                <div className={styles.appFeatureBlurb}>
                    <h3>Spotify Library Cleanup</h3>
                    <p>A tool to help you get rid of songs you no longer listen to.</p>
                </div>
                <div className={styles.appFeatureBlurb}>
                    <h3>Spotify Library Cleanup</h3>
                    <p>A tool to help you get rid of songs you no longer listen to.</p>
                </div>
                <div className={styles.appFeatureBlurb}>
                    <h3>Spotify Library Cleanup</h3>
                    <p>A tool to help you get rid of songs you no longer listen to.</p>
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

export default connect(mapStateToProps)(OverviewView);