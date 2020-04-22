import React from 'react';
import styles from './main.module.scss';
import { connect } from 'react-redux';
import Navbar from '../../../Global/Navbar/Navbar.jsx';
import Banner from '../../../Global/Banner/Banner.jsx';
import Chart from '../../../DataViz/Chart/Chart.jsx';

const Main = props => {
    console.log(props)
    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <Navbar />
                <div className={styles.chartList}>
                    <Chart />
                    <Chart />
                    <Chart />
                    <Chart />
                    <Chart />
                    <Chart />
                    <Chart />
                    <Chart />
                </div>
                
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return { music_library_tracks: state.getMusicLibraryTracks.data };
};

export default connect(mapStateToProps)(Main);