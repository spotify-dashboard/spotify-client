module.exports.getPopularityIndividual = tracksArray => {
    return new Promise( async (resolve, reject) => {
        
        // return object with highest and lowest popularity
        let popularityObj = {
            highest: { trackName: '', popularity: 0 }, // will change to hold highest popularity
            lowest: { trackName: '', popularity: 100 }, // will change to hold lowest popularity
            average: 0 // average of all songs
        };

        let totalPopularity = 0; // holds total sum of all popularity, to divide into avg

        // ==== get highest and lowest popularity

        try {
            // iterate through all tracks
            await tracksArray.forEach(track => {
                if (track.track) {
                    let currentPopularity = track.track.popularity

                    // add to total number, pre averaging
                    totalPopularity += currentPopularity;

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

        // divide total to get average
        let averagePopularity = totalPopularity / tracksArray.length;
        popularityObj.average = averagePopularity; // add to return obj

        // return obj
        resolve(popularityObj);
    });
};