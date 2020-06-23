import React from 'react';
import styles from './recent.module.scss';
import { connect } from 'react-redux';
import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import MobileMenu from '../../Global/MobileMenu/MobileMenu.jsx';
import LoginError from '../../Global/LoginError/LoginError.jsx';

// media queries
import { useMediaPredicate } from "react-media-hook";

// data visuals
import GenreTreeMap from '../../DataViz/Recently_Played/GenreTreeMap/GenreTreeMap.jsx';
import GenreBarChart from '../../DataViz/Recently_Played/GenreBarChart/GenreBarChart.jsx';
import RepeatSongs from '../../DataViz/Recently_Played/RepeatSongs/RepeatSongs.jsx';
import RecentTime from '../../DataViz/Recently_Played/Time/RecentTime.jsx';
import RefreshData from '../../Global/RefreshData/RefreshData.jsx';
import Popularity from '../../DataViz/Recently_Played/Popularity/Popularity.jsx';
import FeaturesRadar from '../../DataViz/Recently_Played/FeaturesRadar/FeaturesRadar.jsx';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../NavItems.js';

const RecentListensView = props => {

    // MEDIA QUERY SIZING
    const mobileMediaQuery = useMediaPredicate("(max-width: 500px)");
    const desktopTabletQuery = useMediaPredicate("(min-width: 501px) and (max-width: 1500px)");

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                
                {mobileMediaQuery && <MobileMenu />}

                {desktopTabletQuery && <MainNav navItems={dashboardNavItems} />}
                
                {!props.isLoggedIn &&
                    <LoginError />
                }

                {props.isLoggedIn &&
                    <div>
                        <div>
                            <div className="flex flex-vertical-align flex-spread">
                                <h1 className={styles.title}>Visualizing your 50 most recent songs</h1>
                                <RefreshData />
                            </div>
                            <p className="textGrey">For many of us, music is a very important part of our lives. The charts below give you a glimpse into your listening history on Spotify, and help to illuminate the type of music listener that you are.</p>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <GenreTreeMap />
                            <GenreBarChart />
                            <div className="divider"></div>
                            <RepeatSongs />
                            <div className="divider"></div>
                            <RecentTime />
                            <div className="divider"></div>
                            <Popularity />
                            <div className="divider"></div>
                            <FeaturesRadar />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.pageChange.currentPage,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    };
};

export default connect(mapStateToProps)(RecentListensView);