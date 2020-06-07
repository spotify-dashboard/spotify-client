// holds the index reference for selectColor func
let index = 0;

// randomized background colors for the chart
let selectColor = () => {
    // Spotify branding colors
    let colors = [
        "rgb(34,176,67)",
        "rgb(41,53,99)", 
        "rgb(213,116,159)",
        "rgb(108,154,243)",
        "rgb(207,239,185)",
        "rgb(121,30,53)",
        "rgb(183,241,226)",
        "rgb(224,99,49)",
        "rgb(242,232,54)",
        "rgb(56,101,82)",
        "rgb(56,0,244)",
        "rgb(241,203,209)"
    ];
    if (index === 0) {
        index++;
        return colors[0]
    } else if (index === colors.length) {
        // reset to 0
        index = 0;
        // return first item
        return colors[index];

    } else if (index > 0 && index < colors.length) {
        index++;
        return colors[index - 1];
    }
}


module.exports.getTimeline = (musicArray) => {
    return new Promise( async (resolve, reject) => {
        
        // timeline return obj
        let timelineObj = {
            dateLabelsByMonth: [], // includes dates as array items
            dateLabelsByYear: [],
            formattedByMonth: [],
            formattedByYear: [],
            yearTally: {}
        };

        let yearObj = {

        }

        const dateConverter = (rawDate) => {
            let date = new Date(rawDate); // convert to date obj
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            // return yyyy-mm
            return `${year}-${month}`;
        };


        // === GET ALL DATE LABELS
        await musicArray.forEach(item => {
            
            // REF playlist name - item.playlistName

            // add playlist names to obj; set equal to empty arrays
            if (!timelineObj.playlists.hasOwnProperty(item.playlistName)) {
                timelineObj.playlists[item.playlistName] = {};
            }

            // for formatting by year
            if (!yearObj.hasOwnProperty(item.playlistName)) {
                yearObj[item.playlistName] = {};
            }

            for (let i = 0; i < item.tracks.length; i++) {
                // format the added at date
                let addedAtDate = dateConverter(item.tracks[i].added_at);

                if (!timelineObj.dateLabelsByMonth.includes(addedAtDate)) {
                    timelineObj.dateLabelsByMonth.push(addedAtDate);
                }
                
                // for year formatting
                let addedAtYear = addedAtDate.slice(0,4);

                if (!timelineObj.dateLabelsByYear.includes(addedAtYear)) {
                    timelineObj.dateLabelsByYear.push(addedAtYear);
                }
            }
        });

        // ==== SORT the date labels
        
        for (let i = 0; i < timelineObj.dateLabelsByMonth.length; i++) {
            timelineObj.dateLabelsByMonth.sort((a,b) => a - b);
        }

        for (let i = 0; i < timelineObj.dateLabelsByYear.length; i++) {
            timelineObj.dateLabelsByYear.sort((a,b) => a - b);
        }

        // iterate through playlists and add each date obj
        // for each playlist
        for (let [key, value] of Object.entries(timelineObj.playlists)) {
            // iterate through date labels
            timelineObj.dateLabelsByMonth.forEach(dateLabel => {
                // save each date label as a property of the specific playlist; set initially to 0
                timelineObj.playlists[key][dateLabel] = 0;

                // for year formatting
                let year = dateLabel.slice(0,4);
                yearObj[key][year] = 0;
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
                
                // for year formatting
                let currentYear = currentDate.slice(0,4);
                yearObj[currentPlaylist][currentYear]++;
            }
        }

        // ==== format By Month

        // iterate through data object
        for (let [key, value] of Object.entries(timelineObj.playlists)) {
            let dataArray = Object.values(timelineObj.playlists[key]);
            timelineObj.formattedByMonth.push({
                label: key,
                backgroundColor: selectColor(),
                data: dataArray
            });
        }

        for (let [key, value] of Object.entries(yearObj)) {
            let dataArray = Object.values(yearObj[key]);
            timelineObj.formattedByYear.push({
                label: key,
                backgroundColor: selectColor(),
                data: dataArray
            })
        }

        // add yearObj to return obj as tally
        timelineObj.yearTally = yearObj;

        resolve(timelineObj);
    });
};