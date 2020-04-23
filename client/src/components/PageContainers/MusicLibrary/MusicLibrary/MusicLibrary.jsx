import React from 'react';
import MostRecentView from '../../../Views/Most_Recent/MostRecentView.jsx';
import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';
import styles from './musiclibrary.module.scss';

const MusicLibraryPage = props => {
    return(
        <div className={styles.musicLibraryPage}>
            <div className="flex">
                <SidebarLeft/>
                <MostRecentView />
                <SidebarRight />
            </div>
            <Footer />
        </div>
    )
};

export default MusicLibraryPage;