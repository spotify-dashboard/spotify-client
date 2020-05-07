import React from 'react';
import styles from './sidebarleft.module.scss';
import sharedStyles from '../sidebars.shared.scss';
import SidebarNav from '../../Global/SidebarNav/SidebarNav.jsx';

import { useMediaPredicate } from "react-media-hook";
import CurrentSong from '../../Global/CurrentSong/CurrentSong.jsx';

const SidebarLeft = props => {

    const tabletMediaQuery = useMediaPredicate("(max-width: 1185px)");

    return(
        <div className={styles.sidebarLeft}>
            <div className="sidebarModule">
            <SidebarNav orientation="column" />
            <div className="divider"></div>
            <div className={sharedStyles.sidebarContent}>
                {tabletMediaQuery && <CurrentSong />}
            </div>
        </div>
        </div>
    )
};

export default SidebarLeft;