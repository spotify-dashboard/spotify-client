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
        backgroundColor: 'rgb(41,53,99)',
    },
    bar: {
        borderRadius: 20,
        backgroundColor: 'rgb(213,116,159)',
    },
    })(LinearProgress);

const Popularity = props => {
    
    return (
        <div className={styles.parentContainer}>
            <div className="flex flex-vertical-align">
                <h3 className={styles.left}>Popularity | Average popularity by playlist</h3>
                <div className={styles.right}>
                    <h4>Overall Average {Math.floor(props.popularityAvg)} / 100</h4>
                    <PopularityBar
                        variant="determinate"
                        color="secondary"
                        value={props.popularityAvg}
                    />
                </div>
            </div>

            {/* List each playlist, if they exist */}

            {Object.keys(props.popularityByPlaylist).length > 0 &&
                <div className={styles.playlistsList}>
                    {Object.keys(props.popularityByPlaylist).map(playlistKey => {
                        return (
                            <div className={styles.playlistPopularityItem}>
                                <h4 className={styles.playlistName}>{playlistKey}</h4>
                                <p className={styles.playlistTotal}>{Math.floor(props.popularityByPlaylist[playlistKey])} / 100</p>
                                <PopularityBar
                                    className={styles.popularityBar}
                                    variant="determinate"
                                    color="secondary"
                                    value={props.popularityByPlaylist[playlistKey]}
                                />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        popularityAvg: state.getPlaylistBreakdown.breakdownAll.popularity.overallAverage,
        popularityByPlaylist: state.getPlaylistBreakdown.breakdownAll.popularity.playlists
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Popularity);