import { actions } from '../actions/types.js';

const initialState = {
    currentSong: [],
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.currentSong.CURRENT_SONG:
            return {
                ...state,
                currentSong: action.payload,
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