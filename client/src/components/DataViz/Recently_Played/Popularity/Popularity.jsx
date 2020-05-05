import React from 'react';
import styles from './popularity.module.scss';
import { connect } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles({
    root: {
        borderRadius: 20,
        height: 30,
        width: 300,
        backgroundColor: 'rgb(41,53,99)',
    },
    bar: {
        borderRadius: 20,
        backgroundColor: 'rgb(213,116,159)',
    },
    })(LinearProgress);


const Popularity = props => {
    console.log('popularity comp', props.recentTracks)

    let mostPopular, leastPopular;
    let high = 0;
    let low = 100;

    // find most and least popular
    for (let i = 0; i < props.recentTracks.length; i++) {
        if (props.recentTracks[i].track.track.popularity > high) {
            high = props.recentTracks[i].track.track.popularity;
            mostPopular = props.recentTracks[i].track.track;
        }
    
        if (props.recentTracks[i].track.track.popularity < low) {
            low = props.recentTracks[i].track.track.popularity;
            leastPopular = props.recentTracks[i].track.track;
        }
        console.log( high, low)
    }
    
    console.log(mostPopular)

    return (
        <div className={styles.parentContainer}>
            <h3>Popularity | Most and least popular?</h3>
            <div className="flex flex-justify-evenly">
                <div className="small-margin-sides">
                    <h3>Most Popular</h3>
                    <h2 className={styles.popularName}>{mostPopular.name}</h2>
                    <p className="textGrey remove-top-margin">{mostPopular.popularity} / 100</p>
                    <BorderLinearProgress 
                        variant="determinate"
                        color="secondary"
                        value={mostPopular.popularity}
                    />
                </div>
                <div className="small-margin-sides">
                    <h3>Most Lame</h3>
                    <h2 className={styles.popularName}>{leastPopular.name}</h2>
                    <p className="textGrey remove-top-margin">{leastPopular.popularity} / 100</p>
                    <BorderLinearProgress 
                        variant="determinate"
                        color="secondary"
                        value={leastPopular.popularity}
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