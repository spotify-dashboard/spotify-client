import React from 'react';
import styles from './logoutview.module.scss';
import { connect } from 'react-redux';
import { pageChange } from '../../../actions/pageChangeActions.js';

// media queries
import { useMediaPredicate } from "react-media-hook";

import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import MobileMenu from '../../Global/MobileMenu/MobileMenu.jsx';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../NavItems.js';

const LogoutView = props => {

    // MEDIA QUERY SIZING
    const mobileMediaQuery = useMediaPredicate("(max-width: 500px)");
    const desktopTabletQuery = useMediaPredicate("(min-width: 501px) and (max-width: 1500px)");

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                
                {mobileMediaQuery && <MobileMenu />}

                {desktopTabletQuery && <MainNav navItems={dashboardNavItems} />}
                
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