const  { getTrackData } = require('../helpers/getTrackData.js');
const { getArtistData } = require('../helpers/getArtistData.js');
const { getGenreData } = require('../helpers/getGenreData.js');

module.exports = {
    recently_played: {
        get: async (req, res) => {

            let completeTrackData = [];

            // reassigned to save all track, artist, and genre data
            let tracksArr;
            let artistsArr;
            let genresArr;

            let topGenres = {};

            // get the tracks, pass in 50 as optional limit since you can ony get 50 recently played songs
            await getTrackData('https://api.spotify.com/v1/me/player/recently-played', 50)
                .then(tracks => {   
                    // set for part of return data
                    tracksArr = tracks;

                    // pass track data into func to get artists for tracks
                    return getArtistData(tracks);
                    
                })
                .then(artistsData => {
                    // set for part of return data
                    artistsArr = artistsData;

                    // pass artists into func to get genres
                    return getGenreData(artistsData);
                })
                .then(genres => {
                    // set for part of return data
                    genresArr = genres;
                })
                .catch(err => {
                    console.log("Error from getTrackData Promise", err);
                    res.status(400).json({message: "Error", error: err});
                });


            // function to flatten genres array and tally genres
            const genreTallyAndSort = () => {
                let flattenedGenres = genresArr.flat(Infinity)
                flattenedGenres.forEach(genre => {
                    if (!topGenres.hasOwnProperty(genre)) {
                        topGenres[genre] = 1;
                    } else if (topGenres.hasOwnProperty(genre)) {
                        topGenres[genre]++;
                    } else {
                        console.log("Error tallying genres");
                    }
                });

                
                console.log(Object.keys(topGenres).sort(function(a,b){return topGenres[a]-topGenres[b]}).map(key => topGenres[key]))

                return topGenres;
            };

            // push the genre tally to return array
            completeTrackData.push({topGenres: genreTallyAndSort()});

            // push track, played_at, artist, and genres for each track
            for (let i = 0; i < genresArr.length; i++) {
                completeTrackData.push({
                    track: tracksArr[i],
                    played_at: artistsArr.playedAtDates[i],
                    artist: artistsArr.artists[i],
                    genres: genresArr[i],
                });
            };

            //return
            res.status(200).json(completeTrackData);
        }
    }
}