import React, { useEffect } from 'react';
import styles from './breakdown.module.scss';
import { connect } from 'react-redux';
import { pageChange } from '../../../../actions/pageChangeActions.js';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems } from '../../../../NavItems.js';

// global components and playlist view
import MainNav from '../../../Global/MainNav/MainNav.jsx';
import Banner from '../../../Global/Banner/Banner.jsx';
import LoginError from '../../../Global/LoginError/LoginError.jsx';
import PlaylistListView from '../PlaylistList/PlaylistListView.jsx';

// icons and spinners
import CircularProgress from '@material-ui/core/CircularProgress';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

// For aggregate playlists visuals
import Timeline from '../../../DataViz/Playlists/All/Timeline/Timeline.jsx';
import GenreTreeMap from '../../../DataViz/Playlists/All/GenreTreeMap/GenreTreeMap.jsx';
import GenreBarChart from '../../../DataViz/Playlists/All/GenreBarChart/GenreBarChart.jsx';
import FeaturesRadar from '../../../DataViz/Playlists/All/FeaturesRadar/FeaturesRadar.jsx';
import Popularity from '../../../DataViz/Playlists/All/Popularity/Popularity.jsx';
import ArtistsTop from '../../../DataViz/Playlists/All/ArtistsTop/ArtistsTop.jsx';

// For individual playlist visuals
import GenreTreeMapIndividual from '../../../DataViz/Playlists/Individual_Playlist/GenreTreeMap/GenreTreeMap.jsx';
import GenreBarChartIndividual from '../../../DataViz/Playlists/Individual_Playlist/GenreBarChart/GenreBarChart.jsx';
import TimelineIndividual from '../../../DataViz/Playlists/Individual_Playlist/Timeline/Timeline.jsx';
import ArtistsTopIndividual from '../../../DataViz/Playlists/Individual_Playlist/ArtistsTop/ArtistsTop.jsx';
import PopularityIndividual from '../../../DataViz/Playlists/Individual_Playlist/Popularity/Popularity.jsx';
import FeaturesRadarIndividual from '../../../DataViz/Playlists/Individual_Playlist/FeaturesRadar/FeaturesRadar.jsx';

// Reusable chart components
import DurationReusable from '../../../DataViz/Playlists/Individual_Playlist/Duration/Duration.jsx';


const PlaylistsView = props => {
    console.log('breakdown playlist view props', props)

    // function to remove stored playlist from local storage;
    // const removeStoredPlaylist = () => {
    //     if (JSON.parse(localStorage.state).getPlaylistBreakdown.breakdownPlaylist) {
    //         delete JSON.parse(localStorage.state).getPlaylistBreakdown.breakdownPlaylist
    //         // console.log(JSON.parse(localStorage.state).getPlaylistBreakdown.breakdownPlaylist)
    //     }
    // };

    useEffect(() => {
        // remove stored playlist on page load
        // removeStoredPlaylist();
        console.log('mounted')
    });

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

                    // ===============================
                    // Displaying list of all playlists
                    // ===============================

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

                        {/* ===================================== */}
                        {/* Viewing individual playlist breakdown */}
                        {/* ===================================== */}

                        {props.currentPage === '/breakdown-playlist' &&
                            <div>
                                {/* LOADING VIEW */}
                                {Array.isArray(props.breakdownPlaylist) &&
                                    <div className={styles.loadingBlurb}>
                                        <h3>Loading Data</h3>
                                        <CircularProgress size={70} />
                                    </div>
                                }
                                {/* DATA LOADED VIEW */}
                                {!Array.isArray(props.breakdownPlaylist) && 
                                    <div>
                                        <div className="flex flex-vertical-align flex-spread">
                                            <div>
                                                <h1>{props.currentPlaylist.name}</h1>
                                                <p className="textGrey">A breakdown of the trends found in {props.currentPlaylist.name}.</p>
                                            </div>
                                            <div>
                                                <DurationReusable 
                                                    duration={props.durationIndividual}
                                                    totalTracks={props.totalTracksIndividual}
                                                />
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <GenreTreeMapIndividual />
                                        <GenreBarChartIndividual />
                                        <div className="divider"></div>
                                        <TimelineIndividual playlistName={props.currentPlaylist.name} />
                                        <ArtistsTopIndividual />
                                        <PopularityIndividual />
                                        <div className="divider"></div>
                                        <FeaturesRadarIndividual />
                                    </div>
                                }
                            </div>
                        }
                        
                        {/* ============================== */}
                        {/* Viewing all playlist breakdown */}
                        {/* ============================== */}

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
                                        <div className="flex flex-vertical-align flex-spread">
                                            <div>
                                                <h1>Breakdown All Playlists</h1>
                                                <p className="textGrey">A breakdown of the trends found after analyzing all of your personal playlists.</p>
                                            </div>
                                            <div>
                                            <DurationReusable 
                                                duration={props.durationAggregate}
                                                totalTracks={props.totalTracksAggregate}
                                            />
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <GenreTreeMap />
                                        <GenreBarChart />
                                        <div className="divider"></div>
                                        <Timeline />
                                        <ArtistsTop />
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
        currentPlaylist: state.getAllPlaylists.currentPlaylist,
        breakdownAll: state.getPlaylistBreakdown.breakdownAll,
        breakdownPlaylist: state.getPlaylistBreakdown.breakdownPlaylist,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
        durationIndividual: state.getPlaylistBreakdown.breakdownPlaylist.duration,
        totalTracksIndividual: state.getPlaylistBreakdown.breakdownPlaylist.totalTrackCount,
        durationAggregate: state.getPlaylistBreakdown.breakdownAll.duration,
        totalTracksAggregate: state.getPlaylistBreakdown.breakdownAll.totalTrackCount,
    };
};

const mapDispatchToProps = {
    pageChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsView);