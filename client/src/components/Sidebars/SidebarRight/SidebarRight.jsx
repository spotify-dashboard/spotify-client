import React from 'react';
import styles from './sidebarright.module.scss';
import sharedStyles from '../sidebars.shared.scss';

const SidebarRight = props => {
    return(
        <div className={styles.sidebarRight}>
            <div className="sidebarModule">
            <h1 className={styles.header}>Sidebar Right</h1>
            <div className={sharedStyles.sidebarContent}>
            
            </div>
        </div>
        </div>
    )
};

export default SidebarRight;