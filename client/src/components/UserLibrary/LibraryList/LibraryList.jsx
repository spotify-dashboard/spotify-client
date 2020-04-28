import React from 'react';
import styles from './librarylist.module.scss';
import { connect } from 'react-redux';
import LibraryItem from '../LibraryItem/LibraryItem.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';


const LibraryList = props => {
    console.log('library list props', props)
    if (props.songs !== undefined && props.songs[0] !== undefined) {
        
        return (
            <div>
                <div className={styles.columnHeaders}>
                    <p className={styles.trackDataItem, styles.columnTitle}>Track Name</p>
                    <p className={styles.columnItem, styles.columnArtist}>Artist</p>
                    <p className={styles.columnItem, styles.columnAlbum}>Album</p>
                    <p className={styles.columnItem, styles.columnDate}>Date Added</p>
                    <p className={styles.columnItem, styles.columnTime}>Time</p>
                </div>
                {props.songs.map(track => {
                    return (
                        <LibraryItem
                            key={props.songs.indexOf(track)} 
                            track={track} 
                        />
                    )
                })}
            </div>
        )
    } 
    
    else {
        return (
            <div className={styles.loadingBlurb}>
                <CircularProgress size={70} />
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return { 
        songs: ownProps.songs,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
        currentPage: state.pageChange.currentPage
    };
};

export default connect(mapStateToProps)(LibraryList);