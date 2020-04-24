import React from 'react';
import styles from './overview.module.scss';
import { connect } from 'react-redux';
import { pageChange } from '../../../actions/pageChangeActions.js';
import { Link } from 'react-router-dom';

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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget quam eget ligula fringilla laoreet. Duis semper nulla eget ante mollis aliquet. Donec iaculis eleifend mollis. Nam in ornare augue. Proin in bibendum arcu, eget tincidunt urna. Curabitur a quam nibh. Morbi eget mattis lectus, eu pulvinar mauris. Integer convallis ex a orci rhoncus commodo. Morbi at erat vestibulum mi dictum luctus.</p>
                </div>
                <div className="flex flex-wrap">
                    <Link to="/library">
                        <div onClick={() => props.pageChange('/clean')} className={styles.appFeatureBlurb}>
                            <img src="#" />
                            <h3>Spotify Library Cleanup</h3>
                            <p>A tool to help you get rid of songs you no longer listen to</p>
                        </div>
                    </Link>
                    <div onClick={() => props.pageChange('/dashboard')} className={styles.appFeatureBlurb}>
                        <img src="#" />
                        <h3>Dashboard</h3>
                        <p>Get a closer look into your Spotify activity</p>
                    </div>
                    <div onClick={() => props.pageChange('/popularity')} className={styles.appFeatureBlurb}>
                        <img src="#" />
                        <h3>Popularity</h3>
                        <p>See how popular your music choices are</p>
                    </div>
                    <Link to="/library">
                        <div onClick={() => props.pageChange('/playlists')} className={styles.appFeatureBlurb}>
                            <img src="#" />
                            <h3>Playlists</h3>
                            <p>View your playlists</p>
                        </div>
                    </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(OverviewView);