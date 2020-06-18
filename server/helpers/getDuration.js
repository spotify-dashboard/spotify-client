// returns the total length of time of in minutes for all tracks in the tracks Array
module.exports.getDuration = (tracksArray) => {
    return new Promise( async (resolve, reject) => {

        let totalTracksNum = 0; // holds the total number of tracks
        let totalDuration = 0; // save total duration (in ms)
        
        // iterate through tracks array
        tracksArray.forEach(track => {
            // if it's a single playlist
            if (track.track !== undefined) {
                // add duration of track (ms) to total duration
                totalDuration += track.track.duration_ms;
                
                // increment total track num
                totalTracksNum++;
            } else if (track.tracks !== undefined) {
                // for groups of playlists (aggregate)
                for (let i = 0; i < track.tracks.length; i++) {
                    let currentTrack = track.tracks[i].track;
                    // add duration of track (ms) to total duration
                    totalDuration += currentTrack.duration_ms;
                    
                    // increment total track num
                    totalTracksNum++;
                }
            }
        });

        //return total
        resolve({
            totalTracks: totalTracksNum,
            totalDuration: totalDuration
        });

    });
};