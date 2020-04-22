import { combineReducers } from 'redux';
import profileReducer from './profileReducer.js';
import musicLibraryTracksReducer from './musicLibraryTracksReducer.js';
import pageChangeReducer from './pageChangeReducer.js';

export default combineReducers({
    getProfile: profileReducer,
    getMusicLibraryTracks: musicLibraryTracksReducer,
    pageChange: pageChangeReducer
});