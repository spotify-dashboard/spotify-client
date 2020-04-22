import { actions } from '../actions/types.js';

const initialState = {
    currentPage: '/',
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.pageChange.PAGE_CHANGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    }
};