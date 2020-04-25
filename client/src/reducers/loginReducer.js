import { actions } from '../actions/types.js';

const initialState = {
    loggedIn: false,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.login.LOGIN_CHECK:
            return {
                ...state,
                loggedIn: action.payload
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