import { combineReducers } from 'redux';
import profileReducer from './profileReducer.js';
import musicLibraryTracksReducer from './musicLibraryTracksReducer.js';
import pageChangeReducer from './pageChangeReducer.js';
import currentSongReducer from './currentSongReducer.js';
import playlistReducer from './playlistReducer.js';
import loginReducer from './loginReducer.js';
import errorReducer from './errorReducer.js';
import recentlyPlayedReducer from './recentlyPlayedReducer.js';
import breakdownReducer from './breakdownReducer.js';

export default combineReducers({
    loginCheck: loginReducer,
    getProfile: profileReducer,
    getRecentlyPlayed: recentlyPlayedReducer,
    getPlaylistBreakdown: breakdownReducer,
    getMusicLibraryTracks: musicLibraryTracksReducer,
    pageChange: pageChangeReducer,
    getCurrentSong: currentSongReducer,
    getAllPlaylists: playlistReducer,
    setError: errorReducer
});