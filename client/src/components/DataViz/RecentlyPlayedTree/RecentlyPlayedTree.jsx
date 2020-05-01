import React from 'react';
import styles from './recentlyplayed.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import 'chartjs-chart-treemap';

const RecentlyPlayedTree = props => {
    console.log('recently played tree', props);

    console.log('pre page load id', document.getElementById('recentlyPlayedTree'))

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

    if (document.getElementById('recentlyPlayedTree') !== null) {
        console.log('not null', document.getElementById('recentlyPlayedTree'))

        let ctx = document.getElementById('recentlyPlayedTree').getContext("2d");
        window.recentlyPlayedTree = new Chart(ctx, {
            type: "treemap",
            data: {
                datasets: [
                    {
                        label: "label",
                        // data: [4,6,10,15],
                        tree: props.genreObjects,
                        key: "listens",
                        groups: ['genre'],
                        fontColor: '#fff',
                        fontFamily: 'sans',
                        fontSize: 14,
                        fontStyle: 'normal',
                        backgroundColor: function(ctx) {
                            var value = ctx.dataset.data[ctx.dataIndex];
                            var alpha = (value + 3) / 10;
                            return Color('green').alpha(alpha).rgbString();
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
        })

    }

    return (
        <div>
            <h2>Recently Played Tree</h2>
            <canvas id="recentlyPlayedTree" className={styles.container}></canvas>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        genreTally: state.getRecentlyPlayed.recentlyPlayed.genres.tally,
        genreObjects: state.getRecentlyPlayed.recentlyPlayed.genres.genre_objects,
    }
};

export default connect(mapStateToProps)(RecentlyPlayedTree);