import React from 'react';
import styles from './librarylist.module.scss';
import { connect } from 'react-redux';
import LibraryItem from '../LibraryItem/LibraryItem.jsx';
import Login from '../../Login/Login.jsx';

const LibraryList = props => {
    console.log(props)
    if (props.favorite_tracks !== undefined) {
        
        return (
            <div>
                <div className={styles.columnHeaders}>
                    <p className={styles.trackDataItem, styles.columnTitle}>Track Name</p>
                    <p className={styles.columnItem, styles.columnArtist}>Artist</p>
                    <p className={styles.columnItem, styles.columnAlbum}>Album</p>
                    <p className={styles.columnItem, styles.columnDate}>Date Added</p>
                    <p className={styles.columnItem, styles.columnTime}>Time</p>
                </div>
                {props.favorite_tracks.map(track => {
                    console.log(track)
                    return (
                        <LibraryItem
                            key={props.favorite_tracks.indexOf(track)} 
                            track={track} 
                        />
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="errorView">
                <h2>Error connecting to your library, please sign in again.</h2>
                <Login />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return { favorite_tracks: state.getMusicLibraryTracks.music_library_tracks };
};

export default connect(mapStateToProps)(LibraryList);