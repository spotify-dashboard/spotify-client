import { actions } from './types.js';
import Axios from 'axios';

export function loginCheck() {
    return function(dispatch) {
        Axios.get('/login/logged-in')
                .then(response => {
                    dispatch({
                        type: actions.login.LOGIN_CHECK,
                        payload: response.data
                    });
                })
                .catch(error => {
                    dispatch({
                        type: actions.login.LOGIN_CHECK,
                        payload: {message: "User is not logged in", isLoggedIn: false}
                    });
                });
    };
};