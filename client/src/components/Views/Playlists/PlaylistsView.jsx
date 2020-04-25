import React from 'react';
import styles from './playlists.module.scss';
import { connect } from 'react-redux';

// the navigation items that are passed into the main nav are stored in this file
import { musicLibraryNavItems } from '../../../NavItems.js';

import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import LoginError from '../../Global/LoginError/LoginError.jsx';

const PlaylistsView = props => {
    console.log('playlist view props', props)

    return (
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={musicLibraryNavItems} />
                {props.allPlaylists[0] === undefined &&
                    <LoginError />
                }
                {props.allPlaylists[0] !== undefined &&
                <div className={styles.playlistsContainer}>
                    {props.allPlaylists.map(playlist => {
                        return (
                            <div className={styles.playlistItem}>
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
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentPage: state.pageChange.currentPage,
        allPlaylists: state.getAllPlaylists.allPlaylists
    };
};

export default connect(mapStateToProps)(PlaylistsView);