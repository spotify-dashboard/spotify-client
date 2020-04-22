import React from 'react';
import { connect } from 'react-redux';

const LibraryList = props => {
    console.log('librarylist comp', props)
    return (
        <div>
            <h1>list</h1>
        </div>
    )
};

const mapStateToProps = state => {
    return { music_library_tracks: state.getMusicLibraryTracks.data };
};

export default connect(mapStateToProps)(LibraryList);