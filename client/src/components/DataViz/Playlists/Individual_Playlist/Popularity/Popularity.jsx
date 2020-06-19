import React from 'react';
import styles from './popularity.module.scss';
import { connect } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';

const PopularityBar = withStyles({
    root: {
        borderRadius: 20,
        height: 15,
        width: "100%",
        backgroundColor: 'rgb(108,154,243)',
    },
    bar: {
        borderRadius: 20,
        backgroundColor: 'rgb(207,239,185)',
    },
    })(LinearProgress);

const PopularityIndividual = props => {
    
    return (
        <div className={styles.parentContainer}>
            <h3>Popularity | Average popularity by playlist</h3>
            <div className="flex flex-vertical-align flex-spread">
                
                {/* AVERAGE */}
                
                <div className={styles.average}>
                    <h4>Overall Average {Math.floor(props.popularityAvg)} / 100</h4>
                    <PopularityBar
                        variant="determinate"
                        color="secondary"
                        value={props.popularityAvg}
                    />
                </div>

                {/* HIGHEST */}

                <div className={styles.highest}>
                    <h4 className="remove-bottom-margin">{props.popularityHighest.trackName}</h4>
                    <p className="textGrey remove-top-margin">{Math.floor(props.popularityHighest.popularity)} / 100</p>
                    <PopularityBar
                        variant="determinate"
                        color="secondary"
                        value={props.popularityHighest.popularity}
                    />
                </div>

                {/* LOWEST */}

                <div className={styles.lowest}>
                    <h4 className="remove-bottom-margin">{props.popularityLowest.trackName}</h4>
                    <p className="textGrey remove-top-margin">{Math.floor(props.popularityLowest.popularity)} / 100</p>
                    <PopularityBar
                        variant="determinate"
                        color="secondary"
                        value={props.popularityLowest.popularity}
                    />
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        popularityAvg: state.getPlaylistBreakdown.breakdownPlaylist.popularity.average,
        popularityHighest: state.getPlaylistBreakdown.breakdownPlaylist.popularity.highest,
        popularityLowest: state.getPlaylistBreakdown.breakdownPlaylist.popularity.lowest
    };
};

export default connect(mapStateToProps)(PopularityIndividual);