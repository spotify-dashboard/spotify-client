import React from 'react';
import styles from './sidebarleft.module.scss';
import sharedStyles from '../sidebars.shared.scss';
import SidebarNav from '../../Global/SidebarNav/SidebarNav.jsx';

const SidebarLeft = props => {
    return(
        <div className={styles.sidebarLeft}>
            <div className="sidebarModule">
            <SidebarNav />
            <div className="divider"></div>
            <div className={sharedStyles.sidebarContent}>
            
            </div>
        </div>
        </div>
    )
};

export default SidebarLeft;