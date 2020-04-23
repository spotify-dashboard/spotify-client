import React from 'react';
import styles from './accountpage.module.scss';

import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';
import AccountView from '../../../Views/Account/AccountView.jsx';

const AccountPage = props => {
    return(
        <div className={styles.accountPage}>
            <div className="flex">
                <SidebarLeft/>
                <AccountView />
                <SidebarRight />
            </div>
            <Footer />
        </div>
    )
};

export default AccountPage;