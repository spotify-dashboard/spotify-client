import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './recentlyplayed.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import 'chartjs-chart-treemap';

class RecentlyPlayedTree extends React.Component {

    componentDidMount() {
        this.initializeTree();
    }

    // a filter on the data

    cleanData(arr) {
        return arr.filter(item => {
          return item.listens > 2;  
        });
    }

    initializeTree() {
        let el = ReactDOM.findDOMNode(this.refs.recentlyPlayedTree);
        let ctx = el.getContext("2d");
        let treeMap = new Chart(ctx, {
            type: "treemap",
            data: {
                datasets: [
                    {
                        tree: this.cleanData(this.props.genreObjects),
                        key: "listens", // what to organize by; must be a valid object property
                        groups: ['genre'],
                        fontColor: 'rgb(213,116,159)',
                        // fontFamily: 'sans',
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
                    display: true,
                    text: "Recent Listening By Genre"
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

        console.log('recently played tree', this.props);

        console.log('pre page load id', document.getElementById('recentlyPlayedTree'))

        return (
            <div>
                <h2>Recently Played Tree</h2>
                <canvas
                    ref="recentlyPlayedTree"
                    className={styles.container}
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

export default connect(mapStateToProps)(RecentlyPlayedTree);