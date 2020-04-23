import React from 'react';
import styles from './dashboard.module.scss';
import { connect } from 'react-redux';
import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';

const Dashboard = props => {

    console.log('dashboard comp props', props)
    
    let libraryNavProps = [
        {id: 1, navItem: 'Overview', navLink: '/'},
        {id: 2, navItem: 'Dashboard', navLink: '/dashboard'},
        {id: 3, navItem: 'Popularity', navLink: '/popularity'},
        {id: 4, navItem: 'Mood', navLink: '/mood'}
    ];

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={libraryNavProps} />
                <h1>Dashboard</h1>
                <h3>In Development. Coming soon!</h3>
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