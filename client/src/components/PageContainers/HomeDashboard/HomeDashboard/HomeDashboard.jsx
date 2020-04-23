import React from 'react';
import styles from './homedashboard.module.scss';
import { connect } from 'react-redux';

import OverviewView from '../../../Views/Overview/OverviewView.jsx';
import DashboardView from '../../../Views/Dashboard/DashboardView.jsx';
import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';

const HomeDashboard = props => {
    console.log('home props', props)
    return(
        <div className={styles.homeDashboard}>
            <div className="flex">
                <SidebarLeft/>
                {props.currentView === '/' &&
                    <OverviewView />
                }
                {props.currentView === '/dashboard' &&
                    <DashboardView />
                }
                <SidebarRight />
            </div>
            <Footer />
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentView: state.pageChange.currentPage,
    }
};

export default connect(mapStateToProps)(HomeDashboard);