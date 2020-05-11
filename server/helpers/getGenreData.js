
module.exports.getGenreData = artistArray => {
    return new Promise(async (resolve, reject) => {

        //stores genres for each artist
        let genresArr = [];
        try {

            if (artistArray.artists !== undefined) {
                //iterate through artist array
                await artistArray.artists.forEach(artist => {
                    // console.log('asdfasdf', artists)
                    genresArr.push(artist.genres);
                });
            } else  {
                await artistArray.forEach(artist => {
                    genresArr.push(artist.genres);
                });
            }

        } catch(err) {
            reject(err);
        }
        
        //return
        resolve(genresArr);
    });
};