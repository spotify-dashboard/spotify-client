import React from 'react';
import styles from './playlistlist.module.scss';
import { connect } from 'react-redux';

import { currentPlaylist } from '../../../../actions/playlistActions.js';
import { pageChange } from '../../../../actions/pageChangeActions.js';
import { breakdownIndividualPlaylist } from '../../../../actions/breakdownActions.js';

const PlaylistListView = props => {

    console.log('playlist list view', props);

    return (
        <div>
            <div className={styles.playlistsContainer}>

                {props.allPlaylists.map(playlist => {
                    
                    // only display playlists created by user
                    if (playlist.owner.display_name === props.profile.display_name) {

                        return (
                            <div
                                key={playlist.id}
                                onClick={() => {props.breakdownIndividualPlaylist(playlist.id); props.currentPlaylist(playlist); props.pageChange('/breakdown-playlist');}}
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
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    };
};

const mapDispatchToProps = {
    currentPlaylist,
    breakdownIndividualPlaylist,
    pageChange
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListView);