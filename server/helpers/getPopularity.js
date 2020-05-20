
module.exports.getPopularity = tracksArray => {
    return new Promise(async (resolve, reject) => {

        // popularity object to resolve
        let popularityObj = {
            overallAverage: [], // array of popularity nums; returned as an average, not array
            playlists: {
                // average popularity for each playlist
                // example of end result: jazzPlaylist: 30
            }
        }

        try {
            // iterate through each playlist group
            tracksArray.forEach(track => {
                // for handling individual playlist from track array
                if (track.hasOwnProperty('track')) {
                    console.log('individual playlist');
                } else if (!track.hasOwnProperty('track')) {
                    // if handling a group of playlists

                    // add the playlist to the popularity obj, set to empty
                    popularityObj.playlists[track.playlistName] = [];

                    for (let i = 0; i < track.tracks.length; i++) {
                        // add each track's popularity to it's playlist array
                        popularityObj.playlists[track.playlistName].push(track.tracks[i].track.popularity);
                        // add popularity to the overall popularity arr
                        popularityObj.overallAverage.push(track.tracks[i].track.popularity);
                    }
                }
            });
            
            // function to get the average popularity for each playlist array
            const getAvgPlaylistPopularity = () => {
                // iterate through each playlist array and reduce into an average
                for (let [key, value] of Object.entries(popularityObj.playlists)) {
                    let length = popularityObj.playlists[key].length;
                    let total = popularityObj.playlists[key].reduce((a,b) => a + b);
                    // reassign as a number (avg) instead of array
                    popularityObj.playlists[key] = total / length;
                }

                // reduce the overall average
                let overallLength = popularityObj.overallAverage.length;
                let overallTotal = popularityObj.overallAverage.reduce((a,b) => a + b);
                popularityObj.overallAverage = overallTotal / overallLength;
            };
            // call func
            getAvgPlaylistPopularity();

            console.log(popularityObj.overallAverage)
            console.log(popularityObj.playlists)

        } catch(err) {
            reject(err);
        }
        
        //return
        resolve(popularityObj);
    });
};