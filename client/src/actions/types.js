
export const actions = {
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
    //error handling
    error: {
        UPDATE_ERROR: 'UPDATE_ERROR'
    }
}