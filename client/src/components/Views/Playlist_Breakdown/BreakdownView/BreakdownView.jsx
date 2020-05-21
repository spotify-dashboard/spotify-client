import React, { useEffect } from 'react';
import styles from './breakdown.module.scss';
import { connect } from 'react-redux';
import { pageChange } from '../../../../actions/pageChangeActions.js';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../../NavItems.js';

import MainNav from '../../../Global/MainNav/MainNav.jsx';
import Banner from '../../../Global/Banner/Banner.jsx';
import LoginError from '../../../Global/LoginError/LoginError.jsx';
import PlaylistListView from '../PlaylistList/PlaylistListView.jsx';
import { breakdownAllPlaylists } from '../../../../actions/breakdownActions.js';

const PlaylistsView = props => {
    console.log('playlist view props', props)

    return (
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={dashboardNavItems} />

                {/* User is not logged in, no data to render */}
                
                {!props.isLoggedIn &&
                    <LoginError />
                }

                {/* User is logged in */}

                {props.isLoggedIn &&

                    // Displaying list of all playlists
                    <div>
                        {props.currentPage === '/breakdown' &&
                            <div>
                                <div>
                                    <h1>Playlist Breakdown</h1>
                                    <p>For many of us, music is a very important part of our lives. The charts below give you a glimpse into your listening history on Spotify, and help to illuminate the type of music listener that you are.</p>
                                    <div className="divider"></div>

                                    {/* Button for all playlist aggregate */}
                                    
                                    <div 
                                        onClick={() => {props.pageChange('/breakdown-all')}}
                                        className={styles.allPlaylistButton}
                                    >
                                        <h4>All Playlists</h4>
                                        <p>Aggregate all playlists</p>
                                    </div>
                                </div>
                                <div className="divider"></div>

                                <PlaylistListView />
                            </div>
                        }

    {/* NOTE::: LOADING/SPINNER VIEW LOGIC IS IN EACH DATA VIZ VIEW */}

                        {/* Viewing individual playlist breakdown */}

                        {props.currentPage === '/breakdown-playlist' &&
                            <div>
                                <h1>Jeff</h1>
                            </div>
                        }

                        {/* Viewing all playlist breakdown */}

                        {props.currentPage === '/breakdown-all' &&
                            <div>
                                <h1>Jeffery</h1>
                            </div>
                        }

    

                        
                    </div>
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentPage: state.pageChange.currentPage,
        profile: state.getProfile.profile,
        allPlaylists: state.getAllPlaylists.allPlaylists || ownProps.allPlaylists,
        playlist: state.getAllPlaylists.playlist,
        breakdownAll: state,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    };
};

const mapDispatchToProps = {
    pageChange,
    breakdownAllPlaylists
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsView);