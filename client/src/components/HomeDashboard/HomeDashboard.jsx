import React from 'react';
import Main from './Main.jsx';
import SidebarLeft from '../Global/SidebarLeft.jsx';
import SidebarRight from '../Global/SidebarRight.jsx';
import Footer from '../Global/Footer.jsx';

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