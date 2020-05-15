const login = require ('../controllers/login.js'); // credentials
const Axios = require('axios');
const throttle = require('lodash.throttle');
const _ = require('lodash');

function throttleAsync(fn, wait) {
    let lastRun = 0;
  
    async function throttled(...args) {
      const currentWait = lastRun + wait - Date.now();
      const shouldRun   = currentWait <= 0;
  
      if (shouldRun) {
        lastRun = Date.now();
        return fn(...args);
      } else {
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve(throttled());
          }, currentWait);
        });
      }
    }
  
    return throttled;
  }

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

            var limit = 1;

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
                // console.log(results.data.items)
                //set total tracks to the total in the res obj, actual #
                totalTracks = results.data.total;
                //push to arr
                dataArr.push(results.data.items);
                
                console.log('offset', offset)
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