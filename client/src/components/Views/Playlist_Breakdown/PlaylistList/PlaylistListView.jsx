import React from 'react';
import styles from './playlistlist.module.scss';
import { connect } from 'react-redux';

import { getPlaylistById } from '../../../../actions/playlistActions.js';
import { pageChange } from '../../../../actions/pageChangeActions.js';

const PlaylistListView = props => {

    console.log('playlist list view', props);

    return (
        <div className={styles.playlistsContainer}>
            <div>

                {props.allPlaylists.map(playlist => {
                    
                    // only display playlists created by user
                    if (playlist.owner.display_name === props.profile.display_name) {

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
                    }
                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListView);