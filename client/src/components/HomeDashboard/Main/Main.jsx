import React from 'react';
import styles from './main.module.scss';

import Navbar from '../../Global/Navbar/Navbar.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import Chart from '../../DataViz/Chart/Chart.jsx';

const Main = props => {

    return(
        <div className="mainSection">
            <div className="mainModule">
                <Banner profile={props.profile} />
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

export default Main;