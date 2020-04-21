import { FETCH_PROFILE, UPDATE_ERROR } from '../actions/types.js';

const initialState = {
    profile: [],
    error: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_PROFILE:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}