import { actions } from './types.js';
import Axios from 'axios';

export function breakdownIndividualPlaylist(playlistId) {
    return function(dispatch) {
        Axios.get(`/api/analyze/${playlistId}`)
            .then(response => {
                dispatch({
                    type: actions.analyze.playlist.ANALYZE_PLAYLIST,
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

export function breakdownAllPlaylists() {
    return function(dispatch) {
        Axios.get('/api/analyze/all')
            .then(response => {
                dispatch({
                    type: actions.analyze.allPlaylists.ANALYZE_ALL_PLAYLISTS,
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