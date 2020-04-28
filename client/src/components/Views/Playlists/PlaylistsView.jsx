import React from 'react';
import styles from './playlists.module.scss';
import { connect } from 'react-redux';
import { getPlaylistById } from '../../../actions/playlistActions.js';
import { pageChange } from '../../../actions/pageChangeActions.js';

// the navigation items that are passed into the main nav are stored in this file
import { musicLibraryNavItems } from '../../../NavItems.js';

import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import LoginError from '../../Global/LoginError/LoginError.jsx';
import LibraryList from '../../UserLibrary/LibraryList/LibraryList.jsx';

const PlaylistsView = props => {
    console.log('playlist view props', props)

    return (
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={musicLibraryNavItems} />

                {/* User is not logged in, no data to render */}
                
                {!props.isLoggedIn &&
                    <LoginError />
                }

                {/* User is logged in */}

                {props.isLoggedIn &&

                    // Displaying list of all playlists

                    <div>
                        {props.currentPage !== '/playlist' &&
                            <div className={styles.playlistsContainer}>
                                <div>
                                    {props.allPlaylists.map(playlist => {
                                        return (
                                            <div
                                                key={playlist.id}
                                                onClick={() => {props.getPlaylistById(playlist.id); props.pageChange('/playlist');}}
                                                className={styles.playlistItem}
                                            >
                                                {playlist.images[0] !== undefined &&
                                                <img className={styles.playlistImg} src={playlist.images[0].url} alt={playlist.description} />
                                                }
                                                <div className={styles.playlistItemRight}>
                                                    <div>
                                                    <h2>{playlist.name}</h2>
                                                    <h4 className="textGrey">{playlist.owner.display_name}</h4>
                                                    <p className="textGrey">{playlist.tracks.total} songs</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }

                        {/* User is viewing a playlist library */}

    {/* NOTE::: LOADING VIEW LOGIC IS IN LIBRARY LIST COMPONENT */}

                        <div className={styles.playlistDisplay}>
                            {props.currentPage === '/playlist' &&
                                <LibraryList 
                                    songs={props.playlist}
                                />
                            }
                        </div>
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
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    };
};

const mapDispatchToProps = {
    getPlaylistById,
    pageChange
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsView);