import React from 'react';
import styles from './libraryitem.module.scss';
import Truncate from 'react-truncate';

const LibraryItem = props => {

    let date_added = props.track.added_at.slice(0, props.track.added_at.indexOf('T'));

    const convertToMinutes = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        //ES6 interpolated literals/template literals 
          //If seconds is less than 10 put a zero in front.
        return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
    };

    return (
        <div className={styles.trackItemContainer}>
            <p className={styles.trackDataItem, styles.trackTitle}>{props.track.track.name}</p>
            <p className={styles.trackDataItem, styles.trackArtist}>{props.track.track.artists[0].name}</p>
            <p className={styles.trackDataItem, styles.trackAlbum}>{props.track.track.album.name}</p>
            <p className={styles.trackDataItem, styles.trackDate}>{date_added}</p>
            <p className={styles.trackDataItem, styles.trackTime}>{convertToMinutes(props.track.track.duration_ms)}</p>
        </div>
    )
};

export default LibraryItem;