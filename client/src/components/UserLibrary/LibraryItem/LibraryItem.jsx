import React from 'react';
import styles from './libraryitem.module.scss';
import { connect } from 'react-redux';

const LibraryItem = props => {

    // console.log('library item props', props)

    let date_added = props.track.added_at.slice(0, props.track.added_at.indexOf('T'));

    const convertToMinutes = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        //ES6 interpolated literals/template literals 
          //If seconds is less than 10 put a zero in front.
        return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
    };

    // For a different display if the track was played recently

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