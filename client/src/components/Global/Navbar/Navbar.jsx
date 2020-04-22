import React from 'react';
import styles from './navbar.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // connect to store

const Navbar = props => {
    console.log('from nav', props)
    return(
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <Link className={styles.link} to="/"><li className={styles.navItem}>Overview</li></Link>
                <Link className={styles.link} to="/library"><li className={styles.navItem}>Music Library</li></Link>
                <li className={styles.navItem}>Dashboard</li>
                <li className={styles.navItem}>Song Recommendations</li>
                <li className={styles.navItem}>Playlists</li>
            </ul>
        </nav>
    )
};

const mapStateToProps = state => {
    return { currentPage: state };
};

export default connect()(Navbar);