import { actions } from './types.js';
import Axios from 'axios';

export function fetchMusicLibraryTracks() {
    return function(dispatch) {
        Axios.get('/api/user-library/tracks')
                .then(response => {
                    console.log(response);
                    dispatch({
                        type: actions.music_library.tracks.FETCH_LIBRARY,
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