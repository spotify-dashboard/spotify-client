import React from 'react';
import styles from './duration.module.scss';
import { connect } from 'react-redux';
import convertToMinutes from '../../../../../helpers/convertToMinutes.js';

const DurationReusable = props => {

    // convert ms to minutes
    let minutesAndSeconds = convertToMinutes(props.duration); // returns X:XX format
    let minutes = minutesAndSeconds.slice(0, minutesAndSeconds.indexOf(':')); // finds minutes

    return (
        <div className={styles.parentContainer}>
            <div>
                <h2>{props.totalTracks} songs</h2>
                <h4 className="textGrey">{minutes} minutes of music</h4>
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        duration: ownProps.duration,
        totalTracks: ownProps.totalTracks
    }
};

export default connect(mapStateToProps)(DurationReusable);