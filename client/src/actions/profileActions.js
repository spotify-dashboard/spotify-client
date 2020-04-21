import { actions } from './types.js';
import Axios from 'axios';

export function fetchProfile() {
    return function(dispatch) {
        Axios.get('/api/profile/me')
            .then(response => {
                dispatch({
                    type: actions.profile.FETCH_PROFILE,
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