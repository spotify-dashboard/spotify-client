const  { getTrackData } = require('../helpers/getTrackData.js');
const { getArtistData } = require('../helpers/getArtistData.js');
const { getGenreData } = require('../helpers/getGenreData.js');
const { getAudioFeatures } = require('../helpers/getAudioFeatures.js');

module.exports = {
    recently_played: {
        get: async (req, res) => {

            // holds returned data
            let completeTrackData = {
                tracks: [],
                genres: []
            };

            // reassigned to save all track, artist, and genre data
            let tracksArr;
            let artistsArr;
            let genresArr;
            let featuresArr;

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
                .then(() => {
                    // get audio features for all songs
                    return getAudioFeatures(tracksArr);
                })
                .then(features => {
                    // set features for return data
                    featuresArr = features;
                })
                .catch(err => {
                    console.log("Error from getTrackData Promise", err);
                    res.status(400).json({message: "Error", error: err});
                });


            // function to flatten genres array and tally genres
            const createGenreObject = async () => {
                
                // creating genre obj to contain multiple genre views
                let genreObject = {}

                // tally of top genres to be added to genre obj
                let genreTally = {};

                // splits each genre into an object of artist name and num of listens
                let genreArrayOfObjects = [];
                
                // flatten genres array
                let flattenedGenres = genresArr.flat(Infinity);

                //iterate through all genres and add to tally
                await flattenedGenres.forEach(genre => {
                    if (!genreTally.hasOwnProperty(genre)) {
                        genreTally[genre] = 1;
                    } else if (genreTally.hasOwnProperty(genre)) {
                        genreTally[genre]++;
                    } else {
                        console.log("Error tallying genres");
                    }
                });
                
                // add tally view to genre object
                genreObject.tally = genreTally;

                for (let [key, value] of Object.entries(genreTally)) {
                    genreArrayOfObjects.push({ genre: key, listens: value });
                }

                // add genre objects to parent obj
                genreObject.genre_objects = genreArrayOfObjects;

                // add genre object to the complete genre that will be served
                completeTrackData.genres = genreObject;
            };

            await createGenreObject();

            // add features to return obj
            completeTrackData.features = featuresArr;

            // push track, played_at, artist, and genres for each track
            for (let i = 0; i < genresArr.length; i++) {
                completeTrackData.tracks.push({
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