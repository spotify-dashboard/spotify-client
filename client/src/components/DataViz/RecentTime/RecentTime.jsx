import React from 'react';
import styles from './recenttime.module.scss';
import { connect } from 'react-redux';

const RecentTime = props => {

    // console.log(props.recentTracks)

    
    const convertDates = (arr) => {

        // categories of listening times; destructured 
        let [early, preNoon, noon, afternoon, earlyEvening, evening, night, lateNight] = [['early',0],['pre-noon',0],['noon',0],['afternoon',0],['early evening',0],['evening',0],['night',0],['late night',0]];
        let timeOfDayObj = {
            early: 0,
            preNoon: 0,
            noon: 0,
            afternoon: 0,
            earlyEvening: 0,
            evening: 0,
            night: 0,
            lateNight: 0
        }
        
        // iterate through tracks
        for (let i = 0; i < arr.length; i++) {
            // convert dates and push to arr
            let convertedDate = new Date(arr[i].played_at);
            let hours = convertedDate.getHours();
            
            // sort into categories
            switch(hours) {
                case 1:case 2:case 3:case 4:
                    timeOfDayObj.lateNight++;
                    break;
                case 5:case 6:case 7:case 8:
                    timeOfDayObj.early++;
                    break;
                case 9:case 10:case 11:
                    timeOfDayObj.preNoon++;
                    break;
                case 12:case 13:
                    timeOfDayObj.noon++;
                    break;
                case 14:case 15:case 16:
                    timeOfDayObj.afternoon++;
                    break;
                case 17:case 18:
                    timeOfDayObj.earlyEvening++;
                    break;
                case 19: case 20: case 21:
                    timeOfDayObj.evening++;
                    break;
                case 22:case 23:case 0:
                    timeOfDayObj.night++;
            }
        }

        // find largest value in obj
        const getMax = object => {
    
            // return an array of top repeat song(s)
            return Object.keys(object).filter(x => {
                 return object[x] == Math.max.apply(null, 
                 Object.values(object));
           });
        };

        //return array of times
        return getMax(timeOfDayObj);
    }

    return (
        <div className={styles.parentContainer}>
            <h3>Time of Day | When have you been listening most often?</h3>
            {convertDates(props.recentTracks).map(time => {
                return (
                <h1 key={convertDates(props.recentTracks).indexOf(time)} className={styles.dateItem}>{time}</h1>
                )
            })}
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        recentTracks: state.getRecentlyPlayed.recentlyPlayed.tracks
    }
};

export default connect(mapStateToProps)(RecentTime);