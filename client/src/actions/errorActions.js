import { actions } from './types.js';

export function setError(error, errorInfo) {
    return function(dispatch) {

        dispatch({
            type: actions.error.SET_ERROR,
            payload: {error: error, errorInfo: errorInfo}
        });
    };
};