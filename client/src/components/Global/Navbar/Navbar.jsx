import React from 'react';
import styles from './navbar.module.scss';

const Navbar = props => {

    return(
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>Overview</li>
                <li className={styles.navItem}>Dashboard</li>
                <li className={styles.navItem}>Song Recommendations</li>
                <li className={styles.navItem}>Playlists</li>
            </ul>
        </nav>
    )
};

export default Navbar;