import React, { useState } from 'react';
import ReactDOM from 'react-dom';   
import styles from './timeline.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';

class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortValue: 'Month'
        }

        this.sortChange = this.sortChange.bind(this);
    }

    componentDidMount() {
        this.initializeChart();
        this.analyzeOldPlaylists();
    }

    initializeChart() {
        // destroy old chart if it exists (something is passed in)
        if (window.timelineBarChart !== undefined) {
            window.timelineBarChart.destroy();
        }

        let el = ReactDOM.findDOMNode(this.refs.timelineBarChart);
        let ctx = el.getContext("2d");
        window.timelineBarChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.state.sortValue === "Month" ? this.props.timelineLabelsByMonth : this.props.timelineLabelsByYear,
                datasets: this.state.sortValue === "Month" ? this.props.timelineDataByMonth : this.props.timelineDataByYear
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                },
                
            }
        })
    }

    sortChange(event) {
        this.setState({
            sortValue: event.target.value
        }, () => {this.initializeChart()});
    }


    // find playlists that you have not added anything to in years
    analyzeOldPlaylists() {

        // hold the playlists
        let playlists = [
            // { name: STR, year: NUM }
        ]

        for (let i = 0 ; i < this.props.timelineDataByYear.length; i++) {
            let currentPlaylist = this.props.timelineDataByYear[i];
            let currentYearIndex = this.props.timelineDataByYear[i].data.length  - 1;
            // if no tracks were added this year or past 2  
            if (currentPlaylist.data[currentYearIndex] === 0 && currentPlaylist.data[currentYearIndex - 1] === 0 && currentPlaylist.data[currentYearIndex - 2] === 0) {
                let index = currentYearIndex;
                // while tracks added for the year is 0
                while (currentPlaylist.data[index] === 0) {
                    // decrement (check prior year)
                    index--;
                }
                // when it finds a year when a track WAS added
                // push object to array with name of playlist and year last added to
                playlists.push({
                    name: currentPlaylist.label,
                    year: this.props.timelineLabelsByYear[index]
                })
            }
        }

        return playlists;
    }

    render() {

        // holds the tally # of tracks by year
        let totalTracksByYear = {

        }
        
        // ==== for displaying track differences between years

        for (let playlistKey in this.props.yearTally) {
            for (let [yearKey, value] of Object.entries(this.props.yearTally[playlistKey])) {
                if (!totalTracksByYear.hasOwnProperty(yearKey)) {
                    totalTracksByYear[yearKey] = value;
                } else {
                    totalTracksByYear[yearKey] += value;
                }
            }
        }

        return (
            <div className={styles.parentContainer}>
                <div className="flex flex-vertical-align flex-spread">
                    <div>
                        <h3>Timeline</h3>
                        <p>Dates when tracks were added, grouped by each of your personal playlists</p>
                    </div>
                    <div>
                        <p>Sort Options</p>
                        <select value={this.state.sortValue} className={styles.groupSelector} onChange={this.sortChange}>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                        </select>
                    </div>
                </div>
                <canvas
                    ref="timelineBarChart"
                    className={styles.graphContainer}
                >
                </canvas>
                
                <div className="divider"></div>
                
                <div className="flex">

                    {/* if user has playlists that haven't been added to in 2+ years */}

                    {this.analyzeOldPlaylists().length > 0 &&
                        <div>
                            <h2>Playlists that need some love</h2>
                            <div className="divider"></div>
                            {this.analyzeOldPlaylists().map(playlist => {
                                return (
                                    <p key={playlist.label}>You haven't added tracks to <span className={styles.highlight}>{playlist.name}</span> since <span className={styles.highlight}>{playlist.year}</span></p>
                                )
                            })}
                        </div>
                    }
                    <div>
                        {/* if year obj contains this year and last */}
                        {totalTracksByYear[new Date().getFullYear()] !== undefined && totalTracksByYear[new Date().getFullYear() - 1] !== undefined &&
                            <div>
                                <div>
                                    {totalTracksByYear[new Date().getFullYear()] > totalTracksByYear[new Date().getFullYear() - 1] &&
                                        <h4>You've added <span className={styles.highlight}>{totalTracksByYear[new Date().getFullYear()] - totalTracksByYear[new Date().getFullYear() - 1]}</span> more songs in {new Date().getFullYear()} than last year</h4>
                                    }
                                </div>
                                <div>
                                    {totalTracksByYear[new Date().getFullYear()] <= totalTracksByYear[new Date().getFullYear() - 1] &&
                                        <h2>You've added <span className={styles.highlight}>{totalTracksByYear[new Date().getFullYear() - 1] - totalTracksByYear[new Date().getFullYear()]}</span> less songs in {new Date().getFullYear()} than last year</h2>
                                    }
                                </div>
                            </div>
                        }
                        <h4>2014 was your most active year where you added 800 songs</h4>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        timelineLabelsByMonth: state.getPlaylistBreakdown.breakdownAll.timeline.dateLabelsByMonth,
        timelineLabelsByYear: state.getPlaylistBreakdown.breakdownAll.timeline.dateLabelsByYear,
        timelineDataByMonth: state.getPlaylistBreakdown.breakdownAll.timeline.formattedByMonth,
        timelineDataByYear: state.getPlaylistBreakdown.breakdownAll.timeline.formattedByYear,
        yearTally: state.getPlaylistBreakdown.breakdownAll.timeline.yearTally
    };
};

export default connect(mapStateToProps)(Timeline);

