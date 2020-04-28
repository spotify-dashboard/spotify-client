import { actions } from './types.js';
import Axios from 'axios';


// ****** dispatch handled in login reducer *****

export function logout() {
    return function(dispatch) {
        Axios.get('/logout/')
                .then(response => {
                    
                    // removes access token
                    dispatch({
                        type: actions.logout.LOGOUT,
                        payload: response.data
                    });

                    //reload page to see changes
                    window.location.reload();
                    //remove state from local storage
                    localStorage.removeItem('state');
                })
                .catch(error => {
                    dispatch({
                        type: actions.error.UPDATE_ERROR,
                        payload: error
                    });
                });
    };
};