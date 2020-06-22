import React from 'react';
import styles from './mood.module.scss';
import { connect } from 'react-redux';
import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import MobileMenu from '../../Global/MobileMenu/MobileMenu.jsx';

// media queries
import { useMediaPredicate } from "react-media-hook";

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../NavItems.js';

const MoodView = props => {

    // MEDIA QUERY SIZING
    const mobileMediaQuery = useMediaPredicate("(max-width: 500px)");
    const desktopTabletQuery = useMediaPredicate("(min-width: 501px) and (max-width: 1500px)");

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                
                {mobileMediaQuery && <MobileMenu />}

                {desktopTabletQuery && <MainNav navItems={dashboardNavItems} />}
                
                <h1>Mood Charting</h1>
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

export default connect(mapStateToProps)(MoodView);