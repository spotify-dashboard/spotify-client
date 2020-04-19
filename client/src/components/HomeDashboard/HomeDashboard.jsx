import React from 'react';
import Main from './Main.jsx';
import Sidebar from '../Global/Sidebar.jsx';
import Navbar from '../Global/Navbar.jsx';
import Footer from '../Global/Footer.jsx';

const HomeDashboard = props => {
    return(
        <div className="main-dashboard">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <Main />
            </div>
            <Footer />
        </div>
    )
};

export default HomeDashboard;