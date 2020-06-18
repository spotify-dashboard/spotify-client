import React from 'react';
import styles from './libraryitem.module.scss';
import { connect } from 'react-redux';
import convertToMinutes from '../../../helpers/convertToMinutes.js';

const LibraryItem = props => {

    let date_added = props.track.added_at.slice(0, props.track.added_at.indexOf('T'));

    // hold list of recently played tracks
    let recentTracksObj = {};

    // add recently played track names to obj
    for (let i = 0; i < props.recentTracks.length; i++) {
        if (!recentTracksObj.hasOwnProperty(props.recentTracks[i].track.track.name)) {
            recentTracksObj[props.recentTracks[i].track.track.name] = props.recentTracks[i].track.track.name;
        }
    }

    recentTracksObj.hasOwnProperty(props.track.track.name) ? console.log(props.track.track.name) : 'no'

    return (
        <div className={recentTracksObj.hasOwnProperty(props.track.track.name) ? `${styles.trackItemContainer} ${styles.recentPlay}` : styles.trackItemContainer}>
            <p className={styles.trackDataItem, styles.trackTitle}>{props.track.track.name}{recentTracksObj.hasOwnProperty(props.track.track.name) ? " - Recently Played" : ""}</p>
            <p className={styles.trackDataItem, styles.trackArtist}>{props.track.track.artists[0].name}</p>
            <p className={styles.trackDataItem, styles.trackAlbum}>{props.track.track.album.name}</p>
            <p className={styles.trackDataItem, styles.trackDate}>{date_added}</p>
            <p className={styles.trackDataItem, styles.trackTime}>{convertToMinutes(props.track.track.duration_ms)}</p>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        recentTracks: state.getRecentlyPlayed.recentlyPlayed.tracks
    }
};

export default connect(mapStateToProps)(LibraryItem);