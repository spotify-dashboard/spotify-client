
export const actions = {
    // check if user is logged in based on finding access token
    login: {
        LOGIN_CHECK: 'LOGIN_CHECK'
    },
    //profile information
    profile: {
        FETCH_PROFILE: 'FETCH_PROFILE',
    },
    //user's music library
    music_library: {
        tracks: {
            FETCH_LIBRARY: 'FETCH_LIBRARY',
        }
    },
    currentSong: {
        CURRENT_SONG: 'CURRENT_SONG'
    },
    pageChange: {
        PAGE_CHANGE: 'PAGE_CHANGE'
    },
    playlists: {
        get: {
            GET_ALL_PLAYLISTS: 'GET_ALL_PLAYLISTS',
            GET_BY_ID: 'GET_BY_ID'
        }
    },
    //error handling
    error: {
        UPDATE_ERROR: 'UPDATE_ERROR'
    }
}