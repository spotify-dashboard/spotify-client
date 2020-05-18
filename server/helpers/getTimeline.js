module.exports.getTimeline = (musicArray) => {
    return new Promise( async (resolve, reject) => {
        
        // timeline return obj
        let timelineObj = {
            dateLabels: [], // includes dates as array items
            playlists: {
                // keys are each playlist name
                // value is an array of objects containing each date object
                    // each date object includes the date and a tally
                // ex
                // rockPlaylist: [
                    //{ "2-6-2018": 0 }
                // ]
            },
        };

        const dateConverter = (rawDate) => {
            let date = new Date(rawDate); // convert to date obj
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            return `${month}-${day}-${year}`;
        };


        // === GET ALL DATE LABELS
        await musicArray.forEach(item => {
            
            // REF playlist name - item.playlistName

            // add playlist names to obj; set equal to empty arrays
            if (!timelineObj.playlists.hasOwnProperty(item.playlistName)) {
                timelineObj.playlists[item.playlistName] = {};
            }

            for (let i = 0; i < item.tracks.length; i++) {
                // format the added at date
                let addedAtDate = dateConverter(item.tracks[i].added_at);
                
                if (!timelineObj.dateLabels.includes(addedAtDate)) {
                    timelineObj.dateLabels.push(addedAtDate);
                }

            }
        });

        // iterate through playlists and add each date obj
        // for each playlist
        for (let [key, value] of Object.entries(timelineObj.playlists)) {
            // iterate through date labels
            timelineObj.dateLabels.forEach(dateLabel => {
                // save each date label as a property of the specific playlist; set initially to 0
                timelineObj.playlists[key][dateLabel] = 0;
            });
        }

        // *** incrementing the playlist object on timeline object
        for (let z = 0; z < musicArray.length; z++) {
            for (let j = 0; j < musicArray[z].tracks.length; j++) {
                // references for the current date and playlist
                let currentPlaylist = musicArray[z].playlistName;
                let currentDate = dateConverter(musicArray[z].tracks[j].added_at);
                
                // increment playlist obj 
                timelineObj.playlists[currentPlaylist][currentDate]++;
            }
        }

        resolve(timelineObj);
    });
};