import React from 'react';
import styles from './homedashboard.module.scss';
import { connect } from 'react-redux';
import { useMediaPredicate } from "react-media-hook";

import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';

import OverviewView from '../../../Views/Overview/OverviewView.jsx';
import RecentListensView from '../../../Views/Recent_Listens/RecentListensView.jsx';
import LogoutView from '../../../Views/Logout/LogoutView.jsx'
import BreakdownView from '../../../Views/Playlist_Breakdown/BreakdownView/BreakdownView.jsx';

const HomeDashboard = props => {
    
    // MEDIA QUERY SIZING
    const tabletMediaQuery = useMediaPredicate("(min-width: 1185px)");
    const mobileMediaQuery = useMediaPredicate("(min-width: 500px)");
    
    return(
        <div className={styles.homeDashboard}>
            <div className="flex">
                
                {mobileMediaQuery && <SidebarLeft />}
                
                {props.currentView === '/' &&
                    <OverviewView />
                }
                {props.currentView === '/logout' &&
                    <LogoutView />
                }
                {props.currentView === '/recent' &&
                    <RecentListensView />
                }
                {props.currentView === '/breakdown' &&
                    <BreakdownView />
                }
                {props.currentView === '/breakdown-all' &&
                    <BreakdownView />
                }
                {props.currentView === '/breakdown-playlist' &&
                    <BreakdownView />
                }
                {tabletMediaQuery && <SidebarRight />}      
            </div>
            {mobileMediaQuery && <Footer />}
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentView: state.pageChange.currentPage,
    }
};

export default connect(mapStateToProps)(HomeDashboard);