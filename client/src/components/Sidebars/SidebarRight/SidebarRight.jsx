import React from 'react';
import styles from './sidebarright.module.scss';
import sharedStyles from '../sidebars.shared.scss';
import CurrentSong from '../../Global/CurrentSong/CurrentSong.jsx';

const SidebarRight = props => {
    
    return(
        <div className={styles.sidebarRight}>
            <div className="sidebarModule">
            <CurrentSong />
            <div className={sharedStyles.sidebarContent}>
            
            </div>
        </div>
        </div>
    )
};

export default SidebarRight;