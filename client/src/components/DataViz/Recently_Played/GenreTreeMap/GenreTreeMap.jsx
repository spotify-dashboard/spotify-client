import React from 'react';
import ReactDOM from 'react-dom';
import styles from './genretreemap.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import 'chartjs-chart-treemap';

class GenreTreeMap extends React.Component {

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
                        groups: ['genre'], // what to organize; must be a valid object prop
                        fontColor: 'rgb(213,116,159)',
                        fontSize: 14,
                        fontStyle: 'normal',
                        label: '# of listens',
                        backgroundColor: 'rgb(41,53,99)'
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
                },
                tooltips: {
                    callbacks: {
                        title: (item, data) => {
                            return;
                        },
                        beforeLabel: (tooltipItem, object) => {
                            // index of the hovered item
                            let currentIndex = tooltipItem.index;
                            // returns the name of the current hovered item
                            return object.datasets[0].data[currentIndex].g;
                        }
                    }
                }
            }
        });
    }

    render() {

        // generate sorted genres and display top 3
        let topGenres = [];
        for (var genre in this.props.genreTally) {
            topGenres.push([genre, this.props.genreTally[genre]]);
        }

        topGenres.sort(function(a, b) {
            return a[1] - b[1];
        });

        return (
            <div className={styles.parentContainer}>
                <div className="flex flex-spread flex-vertical-align">
                    <h3>Genres | Which genres have you been listening to recently?</h3>
                    <div>
                        <p className="textGrey">Top Genres</p>
                        <ol className={styles.genreList}>
                            
                            {/* If top artists exist, list top 3 */}
                            
                            {topGenres[topGenres.length-1] !== undefined &&
                                <li className={styles.genreListItem}>{topGenres[topGenres.length-1][0]}</li>
                            }
                            {topGenres[topGenres.length-2] !== undefined &&
                                <li className={styles.genreListItem}>{topGenres[topGenres.length-2][0]}</li>
                            }
                            {topGenres[topGenres.length-3] !== undefined &&
                                <li className={styles.genreListItem}>{topGenres[topGenres.length-3][0]}</li>
                            }
                        </ol>
                    </div>
                </div>
                <canvas
                    ref="recentlyPlayedTree"
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

export default connect(mapStateToProps)(GenreTreeMap);