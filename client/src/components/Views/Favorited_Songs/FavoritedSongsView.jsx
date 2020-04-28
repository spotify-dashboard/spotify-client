import React from 'react';
import styles from './favorited.module.scss';
import { connect } from 'react-redux';

// the navigation items that are passed into the main nav are stored in this file
import { musicLibraryNavItems } from '../../../NavItems.js';

import MainNav from '../../Global/MainNav/MainNav.jsx';
import Banner from '../../Global/Banner/Banner.jsx';
import MusicList from '../../UserLibrary/LibraryList/LibraryList.jsx';
import LoginError from '../../Global/LoginError/LoginError.jsx';

const FavoritedSongsView = props => {

    console.log('favorited songs view props', props)

    return (
        <div className="mainSection">
            <div className="mainModule">
                <Banner />
                <MainNav navItems={musicLibraryNavItems} />

                {!props.isLoggedIn &&
                    <LoginError />
                }

                {props.isLoggedIn &&
                    <MusicList songs={props.favoriteSongs} />
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentPage: state.pageChange.currentPage,
        favoriteSongs: state.getMusicLibraryTracks.music_library_tracks,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn
    };
};

export default connect(mapStateToProps)(FavoritedSongsView);