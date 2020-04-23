import { actions } from './types.js';

export function pageChange(page) {
    return function(dispatch) {

        dispatch({
            type: actions.pageChange.PAGE_CHANGE,
            payload: page
        });
    };
};