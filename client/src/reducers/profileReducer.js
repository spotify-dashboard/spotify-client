import { actions } from '../actions/types.js';

const initialState = {
    profile: [],
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.profile.FETCH_PROFILE:
            return {
                ...state,
                profile: action.payload,
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