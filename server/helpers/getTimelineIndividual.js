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


module.exports.getTimelineIndividual = (tracksArray) => {
    return new Promise( async (resolve, reject) => {
        
        // timeline return obj
        let timelineObj = {
            dataFormattedByMonth: {},
            dataFormattedByYear: {},
        };

        const dateConverter = (rawDate) => {
            let date = new Date(rawDate); // convert to date obj
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            // return yyyy-mm
            return `${year}-${month}`;
        };


        // === GET ALL DATE LABELS AND TALLY ===============================


        await tracksArray.forEach(track => {
            // date that current track was added
            let addedAtDate = dateConverter(track.added_at);

            // for year formatting
            let addedAtYear = addedAtDate.slice(0,4);

            // formatting data by month
            if (!timelineObj.dataFormattedByMonth.hasOwnProperty(addedAtDate)) {
                timelineObj.dataFormattedByMonth[addedAtDate] = 1;
            } else {
                timelineObj.dataFormattedByMonth[addedAtDate]++;
            }

            // formatting data by year
            if (!timelineObj.dataFormattedByYear.hasOwnProperty(addedAtYear)) {
                timelineObj.dataFormattedByYear[addedAtYear] = 1;
            } else {
                timelineObj.dataFormattedByYear[addedAtYear]++;
            }
        });


        // ==== SORT the date labels =================================
        

        for (let i = 0; i < timelineObj.dateLabelsByMonth.length; i++) {
            timelineObj.dateLabelsByMonth.sort((a,b) => a - b);
        }

        for (let i = 0; i < timelineObj.dateLabelsByYear.length; i++) {
            timelineObj.dateLabelsByYear.sort((a,b) => a - b);
        }

        // ==== RETURN THE FINISHED OBJECT =======================

        resolve(timelineObj);
    });
};