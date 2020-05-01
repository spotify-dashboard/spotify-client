import { actions } from '../actions/types.js';

const initialState = {
    recentlyPlayed: [],
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.recentlyPlayed.GET_RECENTLY_PLAYED:
            return {
                ...state,
                recentlyPlayed: action.payload,
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