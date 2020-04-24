const login = require ('../controllers/login.js'); // credentials
const Axios = require('axios');

module.exports.getTrackData = (url = 'https://api.spotify.com/v1/me/tracks', paylistId) => {
    return new Promise( async (resolve, reject) => {

        //set number of iterations for loop; will change after first api call to the max number of tracks
        let totalTracks = 1;
        //starting position for the call, will incrememt
        let offset = 1;

        //holds all track data
        let dataArr = [];
        
        //while more tracks are available
        while (totalTracks >= offset) {
            const getTracks = await Axios.get(url, {
                headers: {
                    "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                },
                params: {
                    //O(log n) optimization 
                    limit: (totalTracks - offset) < 50 ? 1: 50,
                    offset: offset
                }
            })
            .then(results => {
                //set total tracks to the total in the res obj, actual #
                totalTracks = results.data.total;
                //push to arr
                dataArr.push(results.data.items);
            })
            .catch(error => {
                console.log('error getting tracks in getTrackData.js', error);
                reject(error);
            });

            //O(log n) optimization
            //increment
            offset += (totalTracks - offset) < 50 ? 1: 50;
        }

        //flatten and serve
        let flattenedArr = dataArr.flat(Infinity)
        
        //return
        resolve(flattenedArr);
    });
};