import { actions } from './types.js';
import Axios from 'axios';


// ****** dispatch handled in login reducer *****

export function logout() {
    return function(dispatch) {
        Axios.get('/logout/')
                .then(response => {
                    dispatch({
                        type: actions.logout.LOGOUT,
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