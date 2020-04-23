import React from 'react';
import styles from './librarylist.module.scss';
import { connect } from 'react-redux';
import LibraryItem from '../LibraryItem/LibraryItem.jsx';
import Login from '../../Login/Login.jsx';

const LibraryList = props => {
    console.log('library items', props.music_library_tracks)
    if (props.music_library_tracks !== undefined && props.music_library_tracks.body !== undefined) {

        return (
            <div>
                <div className={styles.columnHeaders}>
                    <p className={styles.trackDataItem, styles.columnTitle}>Track Name</p>
                    <p className={styles.columnItem, styles.columnArtist}>Artist</p>
                    <p className={styles.columnItem, styles.columnAlbum}>Album</p>
                    <p className={styles.columnItem, styles.columnDate}>Date Added</p>
                    <p className={styles.columnItem, styles.columnTime}>Time</p>
                </div>
                {props.music_library_tracks.body.items.map(track => {
                    return (
                        <LibraryItem
                            key={props.music_library_tracks.body.items.indexOf(track)} 
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
    return { music_library_tracks: state.getMusicLibraryTracks.music_library_tracks };
};

export default connect(mapStateToProps)(LibraryList);