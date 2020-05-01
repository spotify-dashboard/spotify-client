import React from 'react';
import styles from './dashboard.module.scss';
import { connect } from 'react-redux';
import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';

// data visuals
import RecentlyPlayedTree from '../../DataViz/RecentlyPlayedTree/RecentlyPlayedTree.jsx';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../NavItems.js';

const Dashboard = props => {

    console.log('dashboard comp props', props)

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={dashboardNavItems} />
                <h1>Dashboard</h1>
                <RecentlyPlayedTree />
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.pageChange.currentPage,
    };
};

export default connect(mapStateToProps)(Dashboard);