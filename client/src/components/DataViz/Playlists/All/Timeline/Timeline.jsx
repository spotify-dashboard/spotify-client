import React from 'react';
import ReactDOM from 'react-dom';   
import styles from './timeline.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';

class Timeline extends React.Component {

    componentDidMount() {
        this.initializeChart();
    }

    // randomized background colors for the chart
    randomizedColor() {
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
        let randomNum = Math.floor(Math.random() * 12);
        return colors[randomNum];
    }

    // data formatting for stacked bar chart
    convertToDatasets() {
        // array of formatted items
        let formattedData = [];
        // iterate through data object
        for (let [key, value] of Object.entries(this.props.timelineData)) {
            let dataArray = Object.values(this.props.timelineData[key]);
            formattedData.push({
                label: key,
                backgroundColor: this.randomizedColor(),
                data: dataArray
            });
        }
        return formattedData;
    }

    initializeChart() {
        let el = ReactDOM.findDOMNode(this.refs.timelineBarChart);
        let ctx = el.getContext("2d");
        let timelineBarChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.props.timelineLabels,
                datasets: this.convertToDatasets()
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

        function colorFromValue(value, border) {
            var alpha = (1 + Math.log(value)) / 5;
            var color = "purple";
            if (border) {
              alpha += 0.01;
            }
            return Color(color)
              .alpha(alpha)
              .rgbString();
        };

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
        timelineData: state.getPlaylistBreakdown.breakdownAll.timeline.playlists
    };
};

export default connect(mapStateToProps)(Timeline);

