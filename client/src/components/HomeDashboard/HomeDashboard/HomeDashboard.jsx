import React from 'react';
import Main from '../Main/Main.jsx';
import SidebarLeft from '../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../Global/Footer/Footer.jsx';

const HomeDashboard = props => {
    return(
        <div className="main-dashboard">
            <div className="flex">
                <SidebarLeft className="left-sidebar"/>
                <Main />
                <SidebarRight className="right-sidebar" />
            </div>
            <Footer />
        </div>
    )
};

export default HomeDashboard;