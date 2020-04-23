import React from 'react';
import styles from './account.module.scss';
import { connect } from 'react-redux';
import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../NavItems.js';

const AccountView = props => {

    console.log('overview comp props', props)

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                {/* <MainNav navItems={dashboardNavItems} /> */}
                <h1>Account Information</h1>
                <div className={styles.accountView}>
                    <p>In development. Coming soon!</p>
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

export default connect(mapStateToProps)(AccountView);