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
        

        for (let i = 0; i < Object.keys(timelineObj.dataFormattedByMonth).length; i++) {
            Object.keys(timelineObj.dataFormattedByMonth).sort((a,b) => a - b);
        }

        for (let i = 0; i < Object.keys(timelineObj.dataFormattedByYear).length; i++) {
            Object.keys(timelineObj.dataFormattedByYear).sort((a,b) => a - b);
        }

        // ==== RETURN THE FINISHED OBJECT =======================

        resolve(timelineObj);
    });
};