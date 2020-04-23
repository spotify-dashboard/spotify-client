import React from 'react';
import styles from './playlists.module.scss';
import { connect } from 'react-redux';

// the navigation items that are passed into the main nav are stored in this file
import { musicLibraryNavItems } from '../../../NavItems.js';

import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';

const PlaylistsView = props => {

    console.log('most recent view props', props)

    return (
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={musicLibraryNavItems} />
                <h1>Playlists</h1>
                <h3>In Development. Playlists coming soon!</h3>
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentPage: state.pageChange.currentPage,
    };
};

export default connect(mapStateToProps)(PlaylistsView);