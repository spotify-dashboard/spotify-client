import { actions } from './types.js';
import Axios from 'axios';

export function getAllPlaylists() {
    return function(dispatch) {
        Axios.get('/api/playlists/')
            .then(response => {
                dispatch({
                    type: actions.playlists.get.GET_ALL_PLAYLISTS,
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

export function getPlaylistById(id) {
    return function(dispatch) {
        Axios.get(`/api/playlists/${id}`)
            .then(response => {
                dispatch({
                    type: actions.playlists.get.GET_BY_ID,
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

export function clearPlaylist() {
    return function(dispatch) {
        dispatch({
            type: actions.playlists.clear.CLEAR_PLAYLIST,
            payload: undefined
        });
    };
};