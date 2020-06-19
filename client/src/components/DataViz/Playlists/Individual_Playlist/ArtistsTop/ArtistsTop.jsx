import React from 'react';
import styles from './artiststop.module.scss';
import { connect } from 'react-redux';

const ArtistsTopIndividual = props => {

    // generate sorted artists
    let topArtists = [];
    for (var artist in props.artistTally) {
        topArtists.push([artist, props.artistTally[artist]]);
    }

    topArtists.sort(function(a, b) {
        return a[1] - b[1];
    });

    return (
        <div className={styles.parentContainer}>
            <h3>Top Artists | Top artists found in your playlists</h3>
            <ol className={styles.artistList}>
                <div className={styles.left}>
                    <li className={styles.artistItem, styles.topArtistItem}>{topArtists[topArtists.length-1][0]}</li>
                    <li className={styles.artistItem, styles.secondArtistItem}>{topArtists[topArtists.length-2][0]}</li>
                </div>
                <div className={styles.right}>
                    <li className={styles.artistItem}>{topArtists[topArtists.length-3][0]}</li>
                    <li className={styles.artistItem}>{topArtists[topArtists.length-4][0]}</li>
                    <li className={styles.artistItem}>{topArtists[topArtists.length-5][0]}</li>
                </div>
            </ol>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        artistTally: state.getPlaylistBreakdown.breakdownPlaylist.artistTally
    }
};

export default connect(mapStateToProps)(ArtistsTopIndividual);