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

import CircularProgress from '@material-ui/core/CircularProgress';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

import Timeline from '../../../DataViz/Playlists/All/Timeline/Timeline.jsx';
import GenreTreeMap from '../../../DataViz/Playlists/All/GenreTreeMap/GenreTreeMap.jsx';
import GenreBarChart from '../../../DataViz/Playlists/All/GenreBarChart/GenreBarChart.jsx';
import FeaturesRadar from '../../../DataViz/Playlists/All/FeaturesRadar/FeaturesRadar.jsx';
import Popularity from '../../../DataViz/Playlists/All/Popularity/Popularity.jsx';

import { breakdownAllPlaylists } from '../../../../actions/breakdownActions.js';


const PlaylistsView = props => {
    console.log('breakdown playlist view props', props)

    // function to remove stored playlist from local storage;
    // const removeStoredPlaylist = () => {
    //     if (JSON.parse(localStorage.state).getPlaylistBreakdown.breakdownPlaylist) {
    //         delete JSON.parse(localStorage.state).getPlaylistBreakdown.breakdownPlaylist
    //         // console.log(JSON.parse(localStorage.state).getPlaylistBreakdown.breakdownPlaylist)
    //     }
    // };

    // useEffect(() => {
    //     // remove stored playlist on page load
    //     removeStoredPlaylist();
    // })

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
                                    <p>Select a playlist below to get a glimpse into your listening history on Spotify.</p>
                                    <div className="divider"></div>

                                    {/* Button for all playlist aggregate */}
                                    
                                    <div 
                                        onClick={() => {props.pageChange('/breakdown-all')}}
                                        className={styles.allPlaylistButton}
                                    >
                                        <DeveloperBoardIcon fontSize="large" className={styles.icon} />
                                        <div className={styles.right}>
                                            <h3 className="remove-all-margin">All Playlists</h3>
                                            <p className="textGrey remove-all-margin">View trends across all of your playlists</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>

                                <PlaylistListView />
                            </div>
                        }

                        {/* Viewing individual playlist breakdown */}

                        {props.currentPage === '/breakdown-playlist' &&
                            <div>
                                jeff
                            </div>
                        }

                        {/* Viewing all playlist breakdown */}

                        {props.currentPage === '/breakdown-all' &&
                            <div>
                                {/* LOADING VIEW */}
                                {Array.isArray(props.breakdownAll) &&
                                    <div className={styles.loadingBlurb}>
                                        <h3>Loading Data</h3>
                                        <CircularProgress size={70} />
                                    </div>
                                }
                                {/* DATA LOADED VIEW */}
                                {!Array.isArray(props.breakdownAll) &&
                                    <div>
                                        <div>
                                            <h1>Breakdown All Playlists</h1>
                                            <p>A breakdown of the trends found after analyzing all of your personal playlists.</p>
                                        </div>
                                        <div className="divider"></div>
                                        <GenreTreeMap />
                                        <GenreBarChart />
                                        <div className="divider"></div>
                                        <Timeline />
                                        <Popularity />  
                                        <div className="divider"></div>
                                        <FeaturesRadar />
                                    </div>
                                }
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
        breakdownAll: state.getPlaylistBreakdown.breakdownAll,
        breakdownPlaylist: state.getPlaylistBreakdown.breakdownPlaylist,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    };
};

const mapDispatchToProps = {
    pageChange,
    breakdownAllPlaylists
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsView);