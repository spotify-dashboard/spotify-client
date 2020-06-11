const { getAllPlaylists } = require('../helpers/getAllPlaylists.js');
const { getTrackData } = require('../helpers/getTrackData.js');
const { getArtistData } = require('../helpers/getArtistData.js');
const { getGenreData } = require('../helpers/getGenreData.js');
const { getAudioFeatures } = require('../helpers/getAudioFeatures.js');
const { getProfile } = require('../helpers/getProfile.js');
const { getTimeline } = require('../helpers/getTimelineAll.js');
const { getTimelineIndividual } = require('../helpers/getTimelineIndividual.js');
const { getPopularity } = require('../helpers/getPopularity.js');

// cache for playlists
var playlistCache = {
    // key names are playlist ids
        // each key's value is an object containing
            // tracks array
};

// delay function; for api call limit; takes miliseconds as argument
const delay = interval => new Promise(resolve => setTimeout(resolve, interval));

module.exports = {
    analyze: {
        // specific playlist breakdown
        playlist: async (req, res) => {

            // holds returned data
            let completeTrackData = {
                // tracks: [],
                genres: [],
                features: [],
                // artists: [],
                // artistTally: {} added at the end of file
                timeline: [],
                added_at_arr: []
            };

            let artistsArr;
            let artistTally;
            let genresArr;
            let featuresArr;
            let timelineObj;
            let addedAtArr;
            let popularityArr;

            // SERVING FROM CACHE

            if (playlistCache.hasOwnProperty(req.params.id)) {
                console.log('Serving playlist breakdown data from cache');
                // serve from cache
                res.status(304).json(playlistCache[req.params.id]);
            } else {

                // NOT SERVING FROM CACHE

                // get tracks; pass in url with playlist id
                await getTrackData(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
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
                        console.log("Error in individual playlist breakdown");
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

                // ==== GET TIMELINE DATA

                await getTimelineIndividual(tracksArr)
                    .then(timelineData => {
                        timelineObj = timelineData;
                        console.log('TIMELINE DATA', timelineData)
                    })
                    .catch(err => {
                        console.log('Error getting timeline data for specific playlist');
                        res.status(400).json({ message: "Error getting playlist timeline", error: err });
                    });

                // add features to return obj
                completeTrackData.features = featuresArr;
                completeTrackData.timeline = timelineObj;

                // add complete data to cache
                playlistCache[req.params.id] = completeTrackData;

                //return
                res.status(200).json(completeTrackData);
            }
        },




        // ==== for aggregating all playlists


        
        allPlaylists: async (req, res) => {

            // holds returned data
            let completeTrackData = {
                // tracks: [],
                genres: [],
                features: [],
                // artists: [],
                // artistTally: {} added at the end of file
                timeline: [],
                added_at_arr: []
            };
            
            let artistsArr;
            let artistTally;
            let genresArr;
            let featuresArr;
            let timelineObj;
            let addedAtArr;
            let popularityArr;
            
            let userProfile;

            //store playlists from get all playlists func
            let playlistsArr = [];
            
            // SERVING FROM CACHE
            if (playlistCache.hasOwnProperty('all')) {
                console.log('Serving aggregate data from cache');
                // serve from cache
                res.status(304).json(playlistCache['all']);
            } else {
                // NOT SERVING FROM CACHE

                // get profile so you have display name to compare playlist owner to
                await getProfile()
                    .then(profile => {
                        userProfile = profile;
                    })
                    .catch(err => {
                        console.log("Error getting profile in playlist breakdown aggregate", err);
                        res.status(400).json({message: "Error", error: err});
                    });
            
                // get all playlists
                await getAllPlaylists('https://api.spotify.com/v1/me/playlists')
                    .then(response => {
                        // save playlists in an arr
                        playlistsArr = response;
                    })
                    .catch(err => {
                        console.log('Error getting all playlists in allPlaylists breakdown', err);
                        res.status(400).json({message: "Error", error: err});
                    });
                

                const processData = async (array) => {

                    // holds all tracks from all relevant playlists during the initial getTrackData func call
                    let tracksCollection = [];

                    // ==== GET TRACKS

                    // iterate through all saved playlists
                    for (let playlist = 0; playlist < array.length; playlist++) {
                        // only iterate through playlists that user owns
                        if (array[playlist].owner.display_name === userProfile.display_name) {
                            

                            // ==== delay for api call limits
                            await delay(100);
                            
                            // get tracks for each playlist
                            await getTrackData(`https://api.spotify.com/v1/playlists/${array[playlist].id}/tracks`)
                                .then(tracks => {
                                    tracksCollection.push({ 
                                        playlistId: array[playlist].id,
                                        playlistName: array[playlist].name,
                                        tracks: tracks
                                    });
                                })
                                .catch(err => {
                                    console.log("Error iterating through playists for data", err);
                                    res.status(400).json({message: "Error", error: err});
                                });
                        }
                    }

                    // flatten the tracks collection
                    let flattenedTracks = tracksCollection.flat(Infinity);

                    // GET TIMELINE

                    await getTimeline(flattenedTracks)
                        .then(response => {
                            timelineObj = response;
                        })
                        .catch(err => {
                            console.log("Error getting timeline data", err);
                            res.status(400).json(err);
                        });
                        
                    // ==== GET ARTISTS

                    await getArtistData(flattenedTracks)
                        .then(artists => {
                            // save artists
                            artistsArr = artists;
                            addedAtArr = artists.addedAtDates;
                            artistTally = artists.artistTally;
                        })
                        .catch(err => {
                            console.log("Error in getting artist data for aggregate", err);
                            res.status(400).json({message: "Error", error: err});
                        });
                    
                    // // ==== GET GENRES
                    await getGenreData(artistsArr)
                        .then(genres => {
                            genresArr = genres;
                        })
                        .catch(err => {
                            console.log("Error getting genre data in aggregate");
                            res.status(400).json({meessage: "Error", error: err});
                        });


                    // ==== GET FEATURES
                    await getAudioFeatures(flattenedTracks)
                        .then(features => {
                            featuresArr = features;
                        })
                        .catch(err => {
                            console.log("Error in getting audio features for aggregate");
                            res.status(400).json({message: "Error", error: err});
                        });

                    // ==== GET POPULARITY CHARTING
                    await getPopularity(flattenedTracks)
                        .then(popularityData => {
                            popularityArr = popularityData;
                        })
                        .catch(err => {
                            console.log("Error in getting popularity for aggregate");
                            res.status(400).json({message: "Error", error: err});
                        })

                    // ==== ORGANIZE GENRE OBJECT
                    // NOTE: PLANNING TO MOVE TO GENRE HELPER FUNCTION

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
                        // console.log('+++', flattenedGenres[0])
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

                        for (let [key, value] of Object.entries(genreTally)) {
                            genreArrayOfObjects.push({ genre: key, listens: value });
                        }

                        // add genre tally
                        completeTrackData.genres = genreTally;
                        // add genre objects
                        completeTrackData.genre_objects = genreArrayOfObjects;
                    };

                    await createGenreObject();

                    
                    // add features to return obj
                    completeTrackData.features = featuresArr.featuresObj;
                    completeTrackData.added_at_arr = addedAtArr;
                    completeTrackData.timeline = timelineObj;
                    completeTrackData.popularity = popularityArr;
                    completeTrackData.artistTally = artistTally

                    // save data object in cache
                    playlistCache['all'] = completeTrackData;

                    // serve
                    res.status(200).json(completeTrackData);
                };

                // call process function
                await processData(playlistsArr);
            }
        }
    }
};