const { getAllPlaylists } = require('../helpers/getAllPlaylists.js');
const { getTrackData } = require('../helpers/getTrackData.js');
const { getArtistData } = require('../helpers/getArtistData.js');
const { getGenreData } = require('../helpers/getGenreData.js');
const { getAudioFeatures } = require('../helpers/getAudioFeatures.js');

// cache for playlists
var playlistCache = {
    // key names are playlist ids
        // each key's value is an object containing
            // tracks array
};

module.exports = {
    analyze: {
        // specific playlist breakdown
        playlist: async (req, res) => {

            // holds returned data
            let completeTrackData = {
                tracks: [],
                genres: []
            };

            let tracksArr;
            let artistsArr;
            let genresArr;
            let featuresArr;

            // console.log(req.params.id)
            // get tracks; pass in url with playlist id
            await getTrackData(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
                .then(tracks => {
                    // set for part of return data
                    tracksArr = tracks;
                    console.log('+++', tracks)
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
                    res.json(artistsArr)
                })
                .catch(err => {
                    console.log("Error in individual playlist breakdown");
                    res.status(400).json({message: "Error", error: err});
                });

            
            // // function to flatten genres array and tally genres
            // const createGenreObject = async () => {
                
            //     // creating genre obj to contain multiple genre views
            //     let genreObject = {}

            //     // tally of top genres to be added to genre obj
            //     let genreTally = {};

            //     // splits each genre into an object of artist name and num of listens
            //     let genreArrayOfObjects = [];
                
            //     // flatten genres array
            //     let flattenedGenres = genresArr.flat(Infinity);

            //     //iterate through all genres and add to tally
            //     await flattenedGenres.forEach(genre => {
            //         if (!genreTally.hasOwnProperty(genre)) {
            //             genreTally[genre] = 1;
            //         } else if (genreTally.hasOwnProperty(genre)) {
            //             genreTally[genre]++;
            //         } else {
            //             console.log("Error tallying genres");
            //         }
            //     });
                
            //     // add tally view to genre object
            //     genreObject.tally = genreTally;

            //     for (let [key, value] of Object.entries(genreTally)) {
            //         genreArrayOfObjects.push({ genre: key, listens: value });
            //     }

            //     // add genre objects to parent obj
            //     genreObject.genre_objects = genreArrayOfObjects;

            //     // add genre object to the complete genre that will be served
            //     completeTrackData.genres = genreObject;
            // };

            // await createGenreObject();

            // // add features to return obj
            // completeTrackData.features = featuresArr;

            // // push track, played_at, artist, and genres for each track
            // for (let i = 0; i < genresArr.length; i++) {
            //     completeTrackData.tracks.push({
            //         track: tracksArr[i],
            //         played_at: artistsArr.playedAtDates[i],
            //         artist: artistsArr.artists[i],
            //         genres: genresArr[i],
            //     });
            // };

            // console.log(completeTrackData)
            // //return
            // res.status(200).json(completeTrackData);
        },
        // for aggregating all playlists
        allPlaylists: async (req, res) => {
            
            // array for storing all tracks 
                // added at prop
                // array of ids
            
            // get all playlists
            await getAllPlaylists('https://api.spotify.com/v1/me/playlists')
                .then(response => {
                    // iterate though all playlist ids
                        console.log('all playlists +++', response)
                        // call getTracks func, pass in url with id

                })
                .catch(err => {
                    console.log('Error in allPlaylists breakdown', err);
                    res.status(400).json({message: "Error", error: err});
                });
        }
    }
};