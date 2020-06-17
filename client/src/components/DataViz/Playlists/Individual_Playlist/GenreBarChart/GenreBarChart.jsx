import React from 'react';
import ReactDOM from 'react-dom';
import styles from './genrebarchart.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import 'chartjs-chart-treemap';
import selectColor from '../../../../../helpers/selectColor.js';

class GenreBarChartIndividual extends React.Component {

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
                        backgroundColor: selectColor()
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
        genreTally: state.getPlaylistBreakdown.breakdownPlaylist.genres.tally,
        genreObjects: state.getPlaylistBreakdown.breakdownPlaylist.genre_objects,
    }
};

export default connect(mapStateToProps)(GenreBarChartIndividual);