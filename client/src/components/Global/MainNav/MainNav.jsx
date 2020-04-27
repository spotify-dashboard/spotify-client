import React from 'react';
import styles from './mainnav.module.scss';
import { connect } from 'react-redux'; // connect to store
import { pageChange } from '../../../actions/pageChangeActions.js';
import { clearPlaylist } from '../../../actions/playlistActions.js';

const MainNav = props => {
    console.log('main nav props', props)
    if (props.navItems !== undefined) {
        return (
            <nav className={styles.navbar}>
                <ul className={styles.navList}>
                    {props.navItems.map(navItem => {

                        return (
                            <li 
                                key={navItem.id}
                                onClick={() => {props.pageChange(navItem.navLink); props.clearPlaylist()}} 
                                className={`${styles.navItem} ${navItem.navLink === props.currentPage ? styles.currentNavItem : ''}`}
                            >
                                    {navItem.navItem}
                            </li>
                        )
                    })}
                </ul>
                
            </nav>
        )
    } else {
        return (
            <nav>
                <h1>Please Sign In</h1>
            </nav>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return { 
        currentPage: state.pageChange.currentPage,
        navItems: ownProps.navItems
    };
};

const mapDispatchToProps = {
    pageChange,
    clearPlaylist
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);