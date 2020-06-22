import React from 'react';
import styles from './clean.module.scss';
import { connect } from 'react-redux';

// media queries
import { useMediaPredicate } from "react-media-hook";

// the navigation items that are passed into the main nav are stored in this file
import { musicLibraryNavItems } from '../../../NavItems.js';

import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import MobileMenu from '../../Global/MobileMenu/MobileMenu.jsx';

const CleanLibraryView = props => {

     // MEDIA QUERY SIZING
     const mobileMediaQuery = useMediaPredicate("(max-width: 500px)");
     const desktopTabletQuery = useMediaPredicate("(min-width: 501px) and (max-width: 1500px)");

    return (
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                
                {mobileMediaQuery && <MobileMenu />}

                {desktopTabletQuery && <MainNav navItems={musicLibraryNavItems} />}

                <h1>Clean My Library</h1>
                <h3>In Development. Library cleaning tool coming soon!</h3>
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentPage: state.pageChange.currentPage,
    };
};

export default connect(mapStateToProps)(CleanLibraryView);