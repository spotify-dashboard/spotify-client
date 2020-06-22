import React from 'react';
import styles from './musiclibrary.module.scss';
import { connect } from 'react-redux';
import { useMediaPredicate } from "react-media-hook";

import SidebarLeft from '../../../Sidebars/SidebarLeft/SidebarLeft.jsx';
import SidebarRight from '../../../Sidebars/SidebarRight/SidebarRight.jsx';
import Footer from '../../../Global/Footer/Footer.jsx';

import FavoritedSongsView from '../../../Views/Favorited_Songs/FavoritedSongsView.jsx';
import CleanView from '../../../Views/Clean_My_Library/CleanView.jsx';
import PlaylistsView from '../../../Views/Playlists/PlaylistsView.jsx';
import RecommendationView from '../../../Views/Song_Recs/RecommendationView.jsx';

const MusicLibraryPage = props => {
    

    // MEDIA QUERY SIZING
    const tabletMediaQuery = useMediaPredicate("(min-width: 1185px)");
    const mobileMediaQuery = useMediaPredicate("(min-width: 500px)");

    return(
        <div className={styles.musicLibraryPage}>
            <div className="flex">
                
                {mobileMediaQuery && <SidebarLeft />}
                
                {props.currentView === '/' &&
                    <PlaylistsView allPlaylists={props.allPlaylists} />
                }
                {props.currentView === '/playlists' && 
                    <PlaylistsView />
                }
                {props.currentView === '/playlist' && 
                    <PlaylistsView />
                }
                {props.currentView === '/clean' &&
                    <CleanView />
                }
                {props.currentView === '/song-recommendations' &&
                    <RecommendationView />
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
        allPlaylists: state.getAllPlaylists.allPlaylists
    };
};

export default connect(mapStateToProps)(MusicLibraryPage);