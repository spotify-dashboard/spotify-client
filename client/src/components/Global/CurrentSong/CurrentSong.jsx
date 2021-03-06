import React from 'react';
import styles from './currentsong.module.scss';
import { connect } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles({
    root: {
        borderRadius: 20,
        height: 10,
        backgroundColor: 'rgb(44,44,44)',
    },
    bar: {
        borderRadius: 20,
        backgroundColor: 'rgb(34,176,67)',
    },
  })(LinearProgress);

const CurrentSong = props => {
    return (
        <aside className={styles.currentSongContainer}>
            <h2>Currently Playing</h2>
            <div className="divider"></div>
            
            {/* No song playing or user is not signed in */}

            {(props.currentSong.item === undefined || props.error !== null) &&
                <p className="textGrey">No track playing or not signed in.</p>
            }

            {/* Advertisement is playing */}

            {props.currentSong.currently_playing_type === 'ad' &&
                <p>Ad playing.</p>
            }

            {/* Song is playing, i.e no errors and song exists */}

            {props.currentSong.item !== undefined && props.currentSong.item !== null && props.error === null &&
            <div>
                <h4 className="textGrey remove-bottom-margin">{props.currentSong.item.name}</h4>
                <div className="flex flex-vertical-align">

                    {props.currentSong.item.album.images[0] !== undefined &&
                        <img 
                            alt={props.currentSong.item.album.name} 
                            src={props.currentSong.item.album.images[0].url} 
                            className={styles.currentAlbumImg}
                        />
                    }
                    <div>
                        <p className="textGrey">{props.currentSong.item.artists[0].name}</p>
                        <p className="textGrey">{props.currentSong.item.album.name}</p>
                    </div>
                </div>
                
                <div className="divider small-margin-top-bottom"></div>
            
                <h4>Song Popularity: {props.currentSong.item.popularity} / 100</h4>
                <BorderLinearProgress
                    variant="determinate"
                    color="secondary"
                    value={props.currentSong.item.popularity}
                />
            </div>
            }

            <div className="divider small-margin-top-bottom"></div>
        </aside>
    )
};

const mapStateToProps = state => {
    return { 
        currentSong: state.getCurrentSong.currentSong,
        error: state.getCurrentSong.error
    };
};

export default connect(mapStateToProps)(CurrentSong);