import { actions } from '../actions/types.js';

const initialState = {
    allPlaylists: [],
    currentPlaylist: undefined,
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.playlists.get.GET_ALL_PLAYLISTS:
            return {
                ...state,
                allPlaylists: action.payload,
                error: null
            }
        case actions.playlists.get.GET_BY_ID:
            return {
                ...state,
                currentPlaylist: action.payload,
                error: null
            }
        case actions.playlists.clear.CLEAR_PLAYLIST:
            return {
                ...state,
                playlist: action.payload,
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