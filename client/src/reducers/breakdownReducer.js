import { actions } from '../actions/types.js';

const initialState = {
    breakdownAll: [],
    breakdownPlaylist: [],
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.analyze.playlist.ANALYZE_PLAYLIST:
            return {
                ...state,
                breakdownPlaylist: action.payload,
                error: null
            }
        case actions.analyze.allPlaylists.ANALYZE_ALL_PLAYLISTS:
            return {
                ...state,
                breakdownAll: action.payload,
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