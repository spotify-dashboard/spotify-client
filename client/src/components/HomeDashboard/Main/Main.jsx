import React from 'react';
import Navbar from '../../Global/Navbar/Navbar.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import styles from './main.module.scss';

const Main = props => {
    return(
        <div className={styles.mainSection}>
            <div className={styles.mainModule}>
                <Banner profile={props.profile} />
                <Navbar />
                
            </div>
        </div>
    )
};

export default Main;