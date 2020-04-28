import { actions } from '../actions/types.js';

const initialState = {
    error: null,
    errorInfo: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.error.SET_ERROR:
            return {
                ...state,
                error: action.payload.error,
                errorInfo: action.payload.errorInfo
            }
        default:
            return state;
    }
};