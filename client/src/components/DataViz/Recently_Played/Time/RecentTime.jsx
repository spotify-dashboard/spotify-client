import React from 'react';
import styles from './recenttime.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import ReactDOM from 'react-dom';

class RecentTime extends React.Component {

    componentDidMount() {
        this.initializeTree();
        this.convertDates(this.props.recentTracks);
    }

    initializeTree() {
        let el = ReactDOM.findDOMNode(this.refs.recentTimeRadar);
        let ctx = el.getContext("2d");
        let radar = new Chart(ctx, {
            type: "radar",
            data: {
                labels: Object.keys(this.convertDates(this.props.recentTracks)), // points on radar
                datasets: [
                    {
                        data: Object.values(this.convertDates(this.props.recentTracks)),
                        fontColor: 'rgb(213,116,159)',
                        fontSize: 14,
                        label: "# of tracks played",
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        borderColor: "rgba(179,181,198,1)",
                        fontStyle: 'normal',
                        backgroundColor: function(ctx) {
                            var value = ctx.dataset.data[ctx.dataIndex];
                            var alpha = (value + 3) / 10;
                            return Color('rgb(41,53,99)').alpha(alpha).rgbString();
                        },
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                title: {
                    display: true,
                    text: "Listening by time of day"
                },
                legend: {
                    display: false
                },
                scale: {
                    gridLines: {
                      color: ['rgb(213,116,159)','rgb(213,116,159)','rgb(213,116,159)','rgb(213,116,159)','rgb(213,116,159)','rgb(213,116,159)']
                    }
                },
                scale: {
                    ticks: {
                       display: false
                    },
                    pointLabels: {
                        fontSize: 20
                      }
                 },
                 tooltips: {
                     callbacks: {
                         title: (item, data) => {
                             return;
                         },
                         label: (item, data) => {
                            console.log(item) 
                            if (item.value === "0") {
                                 return;
                             } else {
                                 return `listens: ${item.value}`
                             }
                         }
                     }
                 }
            }
        });
    }

    convertDates(arr) {

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

        return timeOfDayObj;
    }

    // find largest value in obj
    getMax(object) {
        // return an array of top repeat song(s)
        return Object.keys(object).filter(x => {
            return object[x] == Math.max.apply(null, 
            Object.values(object));
        });
    }

    render() {
        console.log('recent time', this.props)
        return (
            <div className={styles.parentContainer}>
                <div className="flex flex-vertical-align">
                    <div className={styles.left}>
                        <h3>Time of Day | When have you been listening most often?</h3>
                        
                        {this.getMax(this.convertDates(this.props.recentTracks)).map(time => {
                            return (
                            <h1 key={this.getMax(this.convertDates(this.props.recentTracks)).indexOf(time)} className={styles.dateItem}>{time}</h1>
                            )
                        })}
                    </div>
                    <canvas
                        ref="recentTimeRadar"
                        className={styles.graphContainer}
                    >
                    </canvas>
                </div>
            </div>
        )

    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        recentTracks: state.getRecentlyPlayed.recentlyPlayed.tracks
    }
};

export default connect(mapStateToProps)(RecentTime);