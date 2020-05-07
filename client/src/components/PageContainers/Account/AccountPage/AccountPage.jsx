import React from 'react';
import styles from './accountpage.module.scss';
import { useMediaPredicate } from "react-media-hook";

import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';
import AccountView from '../../../Views/Account/AccountView.jsx';

const AccountPage = props => {
    
    // MEDIA QUERY SIZING
    const tabletMediaQuery = useMediaPredicate("(min-width: 1185px)");
    
    return (
        <div className={styles.accountPage}>
            <div className="flex">
                <SidebarLeft/>
                <AccountView />
                {tabletMediaQuery && <SidebarRight />}
            </div>
            <Footer />
        </div>
    )
};

export default AccountPage;