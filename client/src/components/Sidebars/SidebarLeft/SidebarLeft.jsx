import React from 'react';
import styles from './sidebarleft.module.scss';
import sharedStyles from '../sidebars.shared.scss';

const SidebarLeft = props => {
    return(
        <div className={styles.sidebarLeft}>
            <div className="sidebarModule">
            <h1 className={sharedStyles.sidebarHeader}>Sidebar Left</h1>
            <div className={sharedStyles.sidebarContent}>
            
            </div>
        </div>
        </div>
    )
};

export default SidebarLeft;