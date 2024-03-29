const login = require ('../controllers/login.js'); // credentials
const Axios = require('axios');

// delay function; for api call limit; takes miliseconds as argument
const delay = interval => new Promise(resolve => setTimeout(resolve, interval));

module.exports.getTrackData = (url, optionalLimit) => {
    return new Promise( async (resolve, reject) => {

        //set number of iterations for loop; will change after first api call to the max number of tracks
        let totalTracks = 1;
        //starting position for the call, will incrememt
        let offset = 0;

        //holds all track data
        let dataArr = [];
        
        //while more tracks are available
        while (totalTracks >= offset) {

            // ==== delay for api call limits
            await delay(50);

            // set the initial limit
            var limit = 1;

            // change limit based on the total tracks; max of 50
            if ((totalTracks - offset) > 50) {
                limit = 50;
            } else if ((totalTracks - offset) <= 50 && (totalTracks - offset) >= 40) {
                limit = 40;
            } else if ((totalTracks - offset) < 40 && (totalTracks - offset) >= 30) {
                limit = 30;
            } else if ((totalTracks - offset) < 30 && (totalTracks - offset) >= 20) {
                limit = 20;
            } else if ((totalTracks - offset) < 20 && (totalTracks - offset) >= 10) {
                limit = 10;
            } else if ((totalTracks - offset) < 10 && (totalTracks - offset) >= 5) {
                limit = 5;
            } else {
                limit = 1;
            }

            // api call
            const getTracks = await Axios.get(url, {
                headers: {
                    "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                },
                params: {
                    //O(log n) optimization 
                    limit: optionalLimit ? optionalLimit : limit,
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
            offset += limit;
        }

        //flatten and serve
        let flattenedArr = dataArr.flat(Infinity)
        
        //return
        resolve(flattenedArr);
    });
};