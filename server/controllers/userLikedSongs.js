const Axios = require('axios');
const login = require('../controllers/login.js');

module.exports = {
    likedSongs: {
        tracks: {
            get: (req, res) => {

                const getLikedSongData = async () => {

                
                    let maxIterations = 30;
                    let offset = 1;
                    let dataArr = [];
                    
                    while (maxIterations > offset) {
                        const getTracks = await Axios.get('https://api.spotify.com/v1/me/tracks', {
                            headers: {
                                "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                            },
                            params: {
                                limit: 10,
                                offset: offset
                            }
                        })
                        .then(results => {
                            //set max iterations to the total in the res obj
                            maxIterations = results.data.total - 10;
                            //push to arr
                            dataArr.push(results.data.items);
                        })
                        .catch(error => {
                            console.log('error getting music favorites', error);
                            return res.status(400).json(error);
                        });

                        //increment
                        offset += 10;
                    }

                    //flatten and serve
                    let flattenedArr = dataArr.flat(Infinity)
                    res.status(200).json(flattenedArr)
                };

                getLikedSongData();

            }
        }
    }
}