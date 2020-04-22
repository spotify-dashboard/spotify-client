import React from 'react';
import Main from '../Main/Main.jsx';
import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';
import styles from './musiclibrary.module.scss';

const MusicLibraryPage = props => {
    return(
        <div className={styles.musicLibraryPage}>
            <div className="flex">
                <SidebarLeft/>
                <Main />
                <SidebarRight />
            </div>
            <Footer />
        </div>
    )
};

export default MusicLibraryPage;