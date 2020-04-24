import { actions } from './types.js';
import Axios from 'axios';

export function fetchCurrentSong() {
    return function(dispatch) {
        Axios.get('/api/current-song/')
                .then(response => {
                    dispatch({
                        type: actions.currentSong.CURRENT_SONG,
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