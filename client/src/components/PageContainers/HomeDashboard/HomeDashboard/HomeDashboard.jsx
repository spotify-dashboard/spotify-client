import React from 'react';
import styles from './homedashboard.module.scss';
import { connect } from 'react-redux';

import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';

import OverviewView from '../../../Views/Overview/OverviewView.jsx';
import DashboardView from '../../../Views/Dashboard/DashboardView.jsx';
import PopularityView from '../../../Views/Popularity/PopularityView.jsx';
import MoodView from '../../../Views/Mood/MoodView.jsx';

const HomeDashboard = props => {
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
                {props.currentView === '/popularity' &&
                    <PopularityView />
                }
                {props.currentView === '/mood' &&
                    <MoodView />
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