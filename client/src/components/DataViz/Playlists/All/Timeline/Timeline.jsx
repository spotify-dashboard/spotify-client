import React, { useState } from 'react';
import ReactDOM from 'react-dom';   
import styles from './timeline.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';

class Timeline extends React.Component {

    componentDidMount() {
        this.initializeChart();
    }

    initializeChart() {
        let el = ReactDOM.findDOMNode(this.refs.timelineBarChart);
        let ctx = el.getContext("2d");
        let timelineBarChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.props.timelineLabels,
                datasets: this.props.timelineData
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        })
    }

    render() {

        console.log('sorted', this.props.timelineLabels.sort())

        console.log('Timeline comp', this.props);

        return (
            <div className={styles.parentContainer}>
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
        timelineLabels: state.getPlaylistBreakdown.breakdownAll.timeline.dateLabels,
        timelineData: state.getPlaylistBreakdown.breakdownAll.timeline.formattedData
    };
};

export default connect(mapStateToProps)(Timeline);

