import React from 'react';
import styles from './recent.module.scss';
import { connect } from 'react-redux';
import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';

// data visuals
import GenreTreeMap from '../../DataViz/Recently_Played/GenreTreeMap/GenreTreeMap.jsx';
import GenreBarChart from '../../DataViz/Recently_Played/GenreBarChart/GenreBarChart.jsx';
import RepeatSongs from '../../DataViz/Recently_Played/RepeatSongs/RepeatSongs.jsx';
import RecentTime from '../../DataViz/Recently_Played/Time/RecentTime.jsx';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../NavItems.js';

const RecentListensView = props => {

    console.log('recent listens comp props', props)

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={dashboardNavItems} />
                <div>
                    <h1>Visualizing your 50 most recent songs</h1>
                    <p className="textGrey">For many of us, music is a very important part of our lives. See what genres, and artists you've been listening to and how it compares to your usual listening habits.</p>
                </div>
                <div className="divider"></div>
                <div>
                    <GenreTreeMap />
                    <GenreBarChart />
                    <div className="divider"></div>
                    <RepeatSongs />
                    <div className="divider"></div>
                    <RecentTime />
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

export default connect(mapStateToProps)(RecentListensView);