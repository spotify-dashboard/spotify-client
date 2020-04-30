
module.exports.getGenreData = artistArray => {
    return new Promise(async (resolve, reject) => {

        //stores genres for each artist
        let genresArr = [];

        try {
            //iterate through artist array
            await artistArray.artists.forEach(artist => {
                genresArr.push(artist.genres);
            });

        } catch(err) {
            reject(err);
        }
        
        //return
        resolve(genresArr);
    });
};