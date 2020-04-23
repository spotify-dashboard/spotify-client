const login = require('../controllers/login.js');

module.exports = {
    music_library: {
        tracks: {
            get: (req, res) => {

                let offset = 1;
                let dataArr = [];

                const getTracks = login.credentials.getMySavedTracks({
                    limit : 20,
                    offset: offset
                })
                .then(data => {

                    const getData = () => {
                        while (data.body.total > offset) {
                            
                            //run api calls until song count ends
                            login.credentials.getMySavedTracks({
                                limit : 20,
                                offset: offset
                            })
                            .then(results => {
                                dataArr.push(results.body.items);
                                // console.log(dataArr)
                            })
                            .catch(error => {
                                console.log(error);
                            });
                            
                            // increment
                            offset += 20;
                        };

                    }
                    
                    
                    getData();
                    console.log('data arr after func', dataArr)
                    // res.status(200).json(data);
                })
                .catch(err => {
                    console.log(err)
                    // res.status(400).json(err);
                });

                // Promise.all(getTracks)
                //     .then(results => {
                //         console.log('final data', dataArr)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            }
        }
    }
}