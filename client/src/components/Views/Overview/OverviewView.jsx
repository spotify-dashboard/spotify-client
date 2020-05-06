import React from 'react';
import styles from './overview.module.scss';
import { connect } from 'react-redux';
import { pageChange } from '../../../actions/pageChangeActions.js';
import { Link } from 'react-router-dom';

import BarChartIcon from '@material-ui/icons/BarChart';
import QueueIcon from '@material-ui/icons/Queue';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

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
                <div className={styles.summary}>
                    <p>Have you ever wondered what type of music listener you are? 
                        This application uses your personal listening data on Spotify to help you see what trends have shown up in the music that you've been listening to. 
                        Through your playlists and recently played songs, you will gain insight into things like your top genres and artists, the popularity of your music, the time of day that you tend to listen, what's been on repeat, and the characteristics of your favorite songs.
                    </p>

                    {!props.isLoggedIn &&
                        <p>To get started, please <a className="link-green" href="/login/">sign in</a> by clicking the button above.</p>
                    }

                </div>
                <div className="divider"></div>
                <div className="flex flex-wrap">
                    <div onClick={() => props.pageChange('/recent')} className={styles.appFeatureBlurb}>
                        <BarChartIcon fontSize="large" />
                        <h3>Recent Listens</h3>
                        <p>Using your 50 recently played songs, get a closer look into your listening history</p>
                    </div>
                    <div onClick={() => props.pageChange('/breakdown')} className={styles.appFeatureBlurb}>
                        <QueueMusicIcon fontSize="large" />
                        <h3>Playlist Breakdown</h3>
                        <p>Get insights into both overarching trends and individual playlists</p>
                    </div>
                    <Link className={styles.appFeatureBlurb, styles.bottomLink} to="/library">
                        <div onClick={() => props.pageChange('/clean')}>
                            <QueueIcon fontSize="large" />
                            <h3>Spotify Library Cleanup</h3>
                            <p>A tool to help you remove songs that you may no longer listen to</p>
                        </div>
                    </Link>
                </div>
                <div className="divider"></div>
                <h4 className={styles.dataPrivacyTitle}>Data Privacy</h4>
                <p>This application does not save, record or share any of your personal information.</p>
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
const mapDispatchToProps = {
    pageChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewView);