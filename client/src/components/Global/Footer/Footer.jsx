import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pageChange } from '../../../actions/pageChangeActions.js';
import { clearPlaylist } from '../../../actions/playlistActions.js';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Footer = props => {

    return (
        <footer className={styles.footer}>

            <h4 className={styles.websiteTitle}>Spotify Dashboard / Library Tool</h4>

            <nav className={props.orientation === 'column' ? styles.footerNavColumn : styles.footerNavRow}>
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

            <h4 className="textGrey"><a href="https://github.com/spotify-dashboard/spotify-client" target="_blank">View on Github</a></h4>
        </footer>
    )
};

const mapStateToProps = state => {
    return { currentPage: state.pageChange.currentPage };
}

const mapDispatchToProps = {
    pageChange,
    clearPlaylist
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);