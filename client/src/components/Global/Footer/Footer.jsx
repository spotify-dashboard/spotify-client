import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pageChange } from '../../../actions/pageChangeActions.js';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Footer = props => {

    return(
        <footer className={styles.footer}>
            <nav className={props.orientation === 'column' ? styles.footerNavColumn : styles.footerNavRow}>
            <Link to="/" onClick={() => props.pageChange('/')} >
                <div className={styles.navItem}>
                <DashboardIcon className="small-margin-sides" fontSize="small" />
                <h4 className="link">Dashboard</h4>
                </div>
            </Link>
            <Link to="/library" onClick={() => props.pageChange('/playlists')} >
                <div className={styles.navItem}>
                    <LibraryMusicIcon className="small-margin-sides" fontSize="small" />
                    <h4>Music Library</h4>
                </div>
            </Link>
            <Link to="/account" onClick={() => props.pageChange('/account')}>
                <div className={styles.navItem}>
                    <AccountCircleIcon className="small-margin-sides" fontSize="small" />
                    <h4>Account Information</h4>
                </div>
            </Link>
        </nav>
        </footer>
    )
};

const mapStateToProps = state => {
    return { currentPage: state.pageChange.currentPage };
}

const mapDispatchToProps = {
    pageChange
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);