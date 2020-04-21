import { FETCH_PROFILE, UPDATE_ERROR } from './types.js';
import Axios from 'axios';

export function fetchProfile() {
    return function(dispatch) {
        console.log('fetching')
        Axios.get('/api/profile/me')
            .then(response => {
                console.log(response)
                dispatch({
                    type: FETCH_PROFILE,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_ERROR,
                    payload: error
                });
            });
    };
};