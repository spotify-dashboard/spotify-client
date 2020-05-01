import { actions } from './types.js';
import Axios from 'axios';

export function getRecentlyPlayed() {
    return function(dispatch) {
        Axios.get('/api/recently-played/')
            .then(response => {
                dispatch({
                    type: actions.recentlyPlayed.GET_RECENTLY_PLAYED,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: actions.error.UPDATE_ERROR,
                    payload: error
                });
            });
    };
};