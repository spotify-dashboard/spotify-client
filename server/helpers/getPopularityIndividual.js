module.exports.getPopularityIndividual = tracksArray => {
    return new Promise( async (resolve, reject) => {
        
        // return object with highest and lowest popularity
        let popularityObj = {
            highest: { trackName: '', popularity: 0 }, // will change to hold highest popularity
            lowest: { trackName: '', popularity: 100 } // will change to hold lowest popularity
        };

        // ==== get highest and lowest popularity

        try {
            // iterate through all tracks
            await tracksArray.forEach(track => {
                if (track.track) {
                    let currentPopularity = track.track.popularity
                    // find highest popularity
                    if (currentPopularity >= popularityObj.highest.popularity) {
                        popularityObj.highest.popularity = currentPopularity;
                        popularityObj.highest.trackName = track.track.name;
                    }
                    // find lowest popularity
                    if (currentPopularity <= popularityObj.lowest.popularity) {
                        popularityObj.lowest.popularity = currentPopularity;
                        popularityObj.lowest.trackName = track.track.name;
                    }
                }
            });
        } catch(err) {
            reject(err);
        }

        // return obj
        resolve(popularityObj);
    });
};