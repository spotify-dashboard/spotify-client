import React from 'react';
import ReactDOM from 'react-dom';
import styles from './genrebarchart.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import 'chartjs-chart-treemap';

class GenreBarChart extends React.Component {

    componentDidMount() {
        this.initializeChart();
    }

    // filter on the data

    cleanData(arr) {
        return arr.filter(item => {
          return item.listens > 2;  
        });
    }

    initializeChart() {
        let el = ReactDOM.findDOMNode(this.refs.genreBarChart);
        let ctx = el.getContext("2d");
        let barChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(this.props.genreTally),
                datasets: [
                    {
                        data: Object.values(this.props.genreTally),
                        fontColor: 'rgb(213,116,159)',
                        fontSize: 14,
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
                maintainAspectRatio: false,
                title: {
                    display: false,
                },
                legend: {
                    display: false
                }
            }
        });
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

        console.log('genre bar chart', this.props)

        return (
            <div className={styles.parentContainer}>
                <canvas
                    ref="genreBarChart"
                    className={styles.graphContainer}
                >
                </canvas>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        genreTally: state.getRecentlyPlayed.recentlyPlayed.genres.tally,
        genreObjects: state.getRecentlyPlayed.recentlyPlayed.genres.genre_objects,
    }
};

export default connect(mapStateToProps)(GenreBarChart);