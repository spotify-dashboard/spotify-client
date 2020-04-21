import React from 'react';
import Main from '../Main/Main.jsx';
import SidebarLeft from '../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../Global/Footer/Footer.jsx';
import styles from './homedashboard.module.scss';

const HomeDashboard = props => {
    return(
        <div className={styles.homeDashboard}>
            <div className="flex">
                <SidebarLeft/>
                <Main profile={props.profile} />
                <SidebarRight />
            </div>
            <Footer />
        </div>
    )
};

export default HomeDashboard;