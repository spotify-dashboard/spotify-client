import React from 'react';

import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';
import styles from './accountpage.module.scss';

const AccountPage = props => {
    return(
        <div className={styles.accountPage}>
            <div className="flex">
                <SidebarLeft/>
                {/* <Main /> */}
                <SidebarRight />
            </div>
            <Footer />
        </div>
    )
};

export default AccountPage;