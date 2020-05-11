const login = require ('../controllers/login.js'); // credentials
const Axios = require('axios');

module.exports.getAudioFeatures = tracksArray => {
    return new Promise(async (resolve, reject) => {
        //array to hold artists of each track, will need to be comma sep; duplicates are okay
        let trackIds = [];

        let audioFeatures = [];

        // iterate trough tracksArr to get ids - O(n) operation
        await tracksArray.forEach(track => {
            //push artist id to artistArr
            if (track.track.id !== null) {
                trackIds.push(track.track.id);
            }
        });

        //starting point for api call; will increment
        let offset = 0;
        //limit is maxed out at 50
        var limit = 50;
        //total number of artists
        let totalTracks = trackIds.length;
        
        // batch api calls; max 50 tracks
        while (limit <= totalTracks) {
            //api call to get artists for each track
            const featuresApi = await Axios.get('https://api.spotify.com/v1/audio-features', {
                headers: {
                    "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                },
                params: {
                    // join ids with comma
                    ids: trackIds.slice(offset, limit).join(',')
                }
            })
            .then(results => {
                audioFeatures.push(results.data);
            })
            .catch(err => {
                console.log('Error getting audio features', err);
                reject(err);
            });

            // increment offset by 50
            offset += limit;
            // double the limit
            limit += limit;
        }

        // flatten and serve
        let flattenedArr = audioFeatures.flat(Infinity);

        // create an audio features 
        const createFeaturesObj = async () => {
            
            // Features of interest
            // radar: accousticness, danceability, energy, instrumentalness, liveliness, speechiness
            // time signatures - most common
            // bar: loudness

            // obj to be returned
            let featuresObj = {
                featuresTally: {
                    acousticness: 0,
                    danceability: 0,
                    energy: 0,
                    instrumentalness: 0,
                    liveness: 0,
                    speechiness: 0
                },
                avgTimeSignature: 0,
                avgLoudness: 0,
                avgValence: 0 // overall positive/negative feel of songs - 0 (sad) - 1 (happy)
            };

            let totalItems = 0 // keep track of total tracks

            // tally up 
            for (let z = 0; z < flattenedArr.length; z++) {
                for (let j = 0; j < flattenedArr[z].audio_features.length; j++) {
                    totalItems++; // increm
                    
                    featuresObj.featuresTally.acousticness += flattenedArr[z].audio_features[j].acousticness;
                    featuresObj.featuresTally.danceability += flattenedArr[z].audio_features[j].danceability;
                    featuresObj.featuresTally.energy += flattenedArr[z].audio_features[j].energy;
                    featuresObj.featuresTally.instrumentalness += flattenedArr[z].audio_features[j].instrumentalness;
                    featuresObj.featuresTally.speechiness += flattenedArr[z].audio_features[j].speechiness;
                    featuresObj.featuresTally.liveness += flattenedArr[z].audio_features[j].liveness;

                    featuresObj.avgTimeSignature += flattenedArr[z].audio_features[j].time_signature;
                    featuresObj.avgLoudness += flattenedArr[z].audio_features[j].loudness;
                    featuresObj.avgValence += flattenedArr[z].audio_features[j].valence;
                }
            }
            
            // divide by total to get averages
            featuresObj.featuresTally.acousticness = featuresObj.featuresTally.acousticness / totalItems;
            featuresObj.featuresTally.danceability = featuresObj.featuresTally.danceability / totalItems;
            featuresObj.featuresTally.energy = featuresObj.featuresTally.energy / totalItems;
            featuresObj.featuresTally.instrumentalness = featuresObj.featuresTally.instrumentalness / totalItems;
            featuresObj.featuresTally.speechiness = featuresObj.featuresTally.speechiness / totalItems;
            featuresObj.featuresTally.liveness = featuresObj.featuresTally.liveness / totalItems;
            featuresObj.avgTimeSignature = featuresObj.avgTimeSignature / totalItems;
            featuresObj.avgLoudness = featuresObj.avgLoudness / totalItems;
            featuresObj.avgValence = featuresObj.avgValence / totalItems;

            return featuresObj;
        };

        resolve({
            featuresByTrack: flattenedArr,
            featuresObj: await createFeaturesObj()
        });
    });
};