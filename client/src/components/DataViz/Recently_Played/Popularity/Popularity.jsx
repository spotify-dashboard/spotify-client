import React from 'react';
import styles from './popularity.module.scss';
import { connect } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles({
    root: {
        borderRadius: 20,
        height: 30,
        width: "100%",
        backgroundColor: 'rgb(41,53,99)',
    },
    bar: {
        borderRadius: 20,
        backgroundColor: 'rgb(213,116,159)',
    },
    })(LinearProgress);


const Popularity = props => {

    let mostPopular, leastPopular; // used to save full track item
    let high = 0; // saves highest popularity
    let low = 100; // saves lowest popularity

    // find most and least popular
    for (let i = 0; i < props.recentTracks.length; i++) {
        // if the current track popularity is higher than high var
        if (props.recentTracks[i].track.track.popularity > high) {
            high = props.recentTracks[i].track.track.popularity;
            mostPopular = props.recentTracks[i].track; // save the track
        }
        // if the current track popularity is lower than low var
        if (props.recentTracks[i].track.track.popularity < low) {
            low = props.recentTracks[i].track.track.popularity;
            leastPopular = props.recentTracks[i].track; // save the track
        }
    }

    return (
        <div className={styles.parentContainer}>
            <h3>Popularity | Most and least popular?</h3>
            <div className="flex flex-justify-evenly">
                <div className={styles.left}>
                    <h3>Most Popular</h3>
                    <h2 className={styles.popularName}>{mostPopular.track.name}</h2>
                    <p className="textGrey remove-top-margin">{mostPopular.track.artists[0].name}</p>
                    <p className="textGrey remove-top-margin">{mostPopular.track.popularity} / 100</p>
                    <BorderLinearProgress 
                        variant="determinate"
                        color="secondary"
                        value={mostPopular.track.popularity}
                    />
                </div>
                <div className={styles.right}>
                    <h3>Most Lame</h3>
                    <h2 className={styles.popularName}>{leastPopular.track.name}</h2>
                    <p className="textGrey remove-top-margin">{leastPopular.track.artists[0].name}</p>
                    <p className="textGrey remove-top-margin">{leastPopular.track.popularity} / 100</p>
                    <BorderLinearProgress 
                        variant="determinate"
                        color="secondary"
                        value={leastPopular.track.popularity}
                    />
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        recentTracks: state.getRecentlyPlayed.recentlyPlayed.tracks
    }
};

export default connect(mapStateToProps)(Popularity);