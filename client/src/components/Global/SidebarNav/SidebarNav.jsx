import React from 'react';
import styles from './sidebarnav.module.scss';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const SidebarNav = props => {
    
    return (
        <nav className={styles.sidebarNavContainer}>
            <Link to="/" >
                <div className={styles.navItem}>
                <DashboardIcon className="small-margin-sides" fontSize="small" />
                <h4 className="link">Dashboard</h4>
                </div>
            </Link>
            <Link to="/library">
                <div className={styles.navItem}>
                    <LibraryMusicIcon className="small-margin-sides" fontSize="small" />
                    <h4>Music Library</h4>
                </div>
            </Link>
            <Link to="/account">
                <div className={styles.navItem}>
                    <AccountCircleIcon className="small-margin-sides" fontSize="small" />
                    <h4>Account Information</h4>
                </div>
            </Link>
        </nav>
    )
};

export default SidebarNav;