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

    render() {

        return (
            <div className={styles.parentContainer}>
                <div className="flex flex-vertical-align flex-spread">
                    <div>
                        <h3>Timeline</h3>
                        <p>Dates when tracks were added, grouped by playlist</p>
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
    };
};

export default connect(mapStateToProps)(Timeline);

