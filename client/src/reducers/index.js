import { combineReducers } from 'redux';
import profileReducer from './profileReducer.js';
import musicLibraryTracksReducer from './musicLibraryTracksReducer.js';
import pageChangeReducer from './pageChangeReducer.js';
import currentSongReducer from './currentSongReducer.js';

export default combineReducers({
    getProfile: profileReducer,
    getMusicLibraryTracks: musicLibraryTracksReducer,
    pageChange: pageChangeReducer,
    getCurrentSong: currentSongReducer
});