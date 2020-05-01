
export const actions = {
    // check if user is logged in based on finding access token
    login: {
        LOGIN_CHECK: 'LOGIN_CHECK'
    },
    logout: {
        LOGOUT: 'LOGOUT'
    },
    // page change reference for different displays
    pageChange: {
        PAGE_CHANGE: 'PAGE_CHANGE'
    },
    //profile information
    profile: {
        FETCH_PROFILE: 'FETCH_PROFILE',
    },
    // current playing song on spotify
    currentSong: {
        CURRENT_SONG: 'CURRENT_SONG'
    },
    //user's favorited songs
    music_library: {
        tracks: {
            FETCH_LIBRARY: 'FETCH_LIBRARY',
        }
    },
    recentlyPlayed: {
        GET_RECENTLY_PLAYED: 'GET_RECENTLY_PLAYED'
    },
    // playlists
    playlists: {
        get: {
            GET_ALL_PLAYLISTS: 'GET_ALL_PLAYLISTS',
            GET_BY_ID: 'GET_BY_ID'
        },
        clear: {
            CLEAR_PLAYLIST: 'CLEAR_PLAYLIST'
        }
    },
    //error handling
    error: {
        UPDATE_ERROR: 'UPDATE_ERROR', // updates if error happens on api calls to server
        SET_ERROR: 'SET_ERROR' // used in componentDidCatch
    }
}