const login = require ('../controllers/login.js'); // credentials
const Axios = require('axios');

// delay function; for api call limit; takes miliseconds as argument
const delay = interval => new Promise(resolve => setTimeout(resolve, interval));

module.exports.getArtistData = (tracksArray) => {
    return new Promise(async (resolve, reject) => {
        //array to hold artists of each track, will need to be comma sep; duplicates are okay
        let artistsArr = [];

        //array to hold response genre data
        let genresArr = [];

        // capture the date/time played at, if exists (most recent tracks api)
        let playedAtArr = [];

        // capture the date/time added to playlist
        let addedAtArr = [];

        // iterate trough tracksArr to get artists - O(n) operation
        tracksArray.forEach(track => {
            if (track.track !== undefined) {
                if (track.track.artists[0].id !== null) {
                    //push artist id to artistArr
                    artistsArr.push(track.track.artists[0].id);
                }
                // if song has a played_at parameter (for recent songs api)
                if (track.hasOwnProperty("played_at")) {
                    // push played_at date 
                    playedAtArr.push(track.played_at);
                }
                if (track.hasOwnProperty("added_at")) {
                    // push played_at date 
                    addedAtArr.push(track.added_at);
                }
            }
        });

        //starting point for api call; will increment
        let offset = 0;
        //limit is maxed out at 50
        var limit = 50;
        //total number of artists
        let totalArtists = artistsArr.length;
        
        // batch api calls; max 50 artists
        while (limit <= totalArtists) {

            // ==== delay for api call limits
            await delay(100);

            //api call to get artists for each track
            const artistsApi = await Axios.get('https://api.spotify.com/v1/artists', {
                headers: {
                    "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                },
                params: {
                    // join ids with comma
                    ids: artistsArr.slice(offset, limit).join(',')
                }
            })
            .then(results => {
                genresArr.push(results.data.artists);
            })
            .catch(err => {
                console.log('Error in getting artist genres', err);
                reject(err);
            });

            // increment offset by 50
            offset += limit;
            // double the limit
            limit += limit;
        }

        //flatten and serve
        let flattenedArr = genresArr.flat(Infinity);

        // if there's a played_at prop for each track
        if (playedAtArr.length > 0) {
            // return played at, and artists
            resolve({
                playedAtDates: playedAtArr,
                artists: flattenedArr
            })
        } else if (addedAtArr.length > 0) {
            // return added at and artists
            resolve({
                addedAtDates: addedAtArr,
                artists: flattenedArr
            })
        } else {
            // return just the artists
            resolve(flattenedArr);
        }
    });
};