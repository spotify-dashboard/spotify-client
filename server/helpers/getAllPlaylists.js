const login = require ('../controllers/login.js'); // credentials
const Axios = require('axios');

module.exports.getAllPlaylists = (url, params) => {
    return new Promise( async (resolve, reject) => {

        //set number of iterations for loop; will change after first api call to the max number of tracks
        let totalPlaylists = 1;
        //starting position for the call, will incrememt
        let offset = 1;

        //holds all track data
        let dataArr = [];
        
        //while more tracks are available
        while (totalPlaylists >= offset) {
            const getPlaylists = await Axios.get(url, {
                headers: {
                    "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                },
                params: {
                    //O(log n) optimization 
                    limit: (totalPlaylists - offset) < 20 ? 1: 20,
                    offset: offset
                }
            })
            .then(results => {
                //set total tracks to the total in the res obj, actual #
                totalPlaylists = results.data.total;
                //push to arr
                dataArr.push(results.data.items);

                console.log(totalPlaylists)
            })
            .catch(error => {
                console.log('error getting tracks in getAllPlaylists.js', error);
                reject(error);
            });

            //O(log n) optimization
            //increment
            offset += (totalPlaylists - offset) < 20 ? 1: 20;
        }

        //flatten and serve
        let flattenedArr = dataArr.flat(Infinity)
        
        //return
        resolve(flattenedArr);
    });
};