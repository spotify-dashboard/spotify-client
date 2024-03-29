import React from 'react';
import styles from './sidebarnav.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // connect to store
import { pageChange } from '../../../actions/pageChangeActions.js';
import { clearPlaylist } from '../../../actions/playlistActions.js';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const SidebarNav = props => {
    
    return (
        <nav className={props.orientation === 'row' ? styles.sidebarNavContainerRow : styles.sidebarNavContainerColumn}>
            <Link to="/" onClick={() => {props.pageChange('/'); props.clearPlaylist();}} >
                <div className={styles.navItem}>
                <DashboardIcon className="small-margin-sides" fontSize="small" />
                <h4 className="link">Dashboard</h4>
                </div>
            </Link>
            <Link to="/library" onClick={() => {props.pageChange('/playlists'); props.clearPlaylist();}} >
                <div className={styles.navItem}>
                    <LibraryMusicIcon className="small-margin-sides" fontSize="small" />
                    <h4>Music Library</h4>
                </div>
            </Link>
            <Link to="/account" onClick={() => {props.pageChange('/account'); props.clearPlaylist();}}>
                <div className={styles.navItem}>
                    <AccountCircleIcon className="small-margin-sides" fontSize="small" />
                    <h4>Account Information</h4>
                </div>
            </Link>
        </nav>
    )
};

const mapStateToProps = (state, ownProps) => {
    return { 
        currentPage: state.pageChange.currentPage,
        orientation: ownProps
    };
};

const mapDispatchToProps = {
    pageChange,
    clearPlaylist
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav);