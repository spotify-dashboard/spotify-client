import React from 'react';
import styles from './main.module.scss';
import { connect } from 'react-redux';
import Navbar from '../../../Global/Navbar/Navbar.jsx';
import Banner from '../../../Global/Banner/Banner.jsx';
import MusicList from '../../../UserLibrary/LibraryList/LibraryList.jsx';

const Main = props => {
    console.log('music lib comp', props);
    return (
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <Navbar />
                <h1>MUSIC LIBRARY</h1>
                <MusicList />
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return { music_library_tracks: state.getMusicLibraryTracks.data };
};

export default connect(mapStateToProps)(Main);