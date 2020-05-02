import React from 'react';
import ReactDOM from 'react-dom';
import styles from './repeatsongs.module.scss';
import { connect } from 'react-redux';

const RepeatSongs = props => {

    let repeatSongsObj = {};

    // get songs that were played more than once
    for (let i = 0; i < props.recentTracks.length; i++) {
        let currentTrack = props.recentTracks[i].track.track.name;
        // add keys to obj and increment
        if (!repeatSongsObj.hasOwnProperty(currentTrack)) {
            repeatSongsObj[currentTrack] = 1;
        } else {
            repeatSongsObj[currentTrack]++;
        }
    
    }

    // get highest values in obj
    const getMax = object => {

        // check if no repeats exist
        if (!Object.values(object).includes(2 || 3 || 4)) {
            return ["No repeat songs"];
        }

        // return an array of top repeat song(s)
        return Object.keys(object).filter(x => {
             return object[x] == Math.max.apply(null, 
             Object.values(object));
       });
    };

    return (
        <div className={styles.parentContainer}>
            <h3>Songs on Repeat | What's been stuck in your head?</h3>
            {getMax(repeatSongsObj).map(song => {
                return (
                <h1 
                    key={getMax(repeatSongsObj).indexOf(song)}
                    className={styles.repeatSongItem}
                >
                    {song}
                </h1>
                )
            })}
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        recentTracks: state.getRecentlyPlayed.recentlyPlayed.tracks
    }
};

export default connect(mapStateToProps)(RepeatSongs);