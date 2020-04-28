import { actions } from '../actions/types.js';

const initialState = {
    music_library_tracks: [],
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.music_library.tracks.FETCH_LIBRARY:
            return {
                ...state,
                music_library_tracks: action.payload,
                error: null
            }
        case actions.error.UPDATE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};