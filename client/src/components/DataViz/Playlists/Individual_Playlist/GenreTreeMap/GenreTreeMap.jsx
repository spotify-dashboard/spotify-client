import React from 'react';
import ReactDOM from 'react-dom';
import styles from './genretreemap.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import 'chartjs-chart-treemap';

class GenreTreeMapIndividual extends React.Component {

    componentDidMount() {
        this.initializeTree();
    }

    // a filter on the data

    cleanData(arr) {
        return arr.filter(item => {
          return item.listens > 5;
        });
    }

    initializeTree() {
        let el = ReactDOM.findDOMNode(this.refs.individualPlaylistGenreTree);
        let ctx = el.getContext("2d");
        let treeMap = new Chart(ctx, {
            type: "treemap",
            data: {
                datasets: [
                    {
                        tree: this.cleanData(this.props.genreObjects),
                        key: "listens", // what to organize by; must be a valid object property
                        groups: ['genre'], // what to organize; must be a valid object prop
                        fontColor: 'rgb(207,239,185)',
                        fontSize: 14,
                        fontStyle: 'normal',
                        label: '# of tracks',
                        backgroundColor: 'rgb(108,154,243)'
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Genres"
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
        for (var genre in this.props.genresTally) {
            topGenres.push([genre, this.props.genresTally[genre]]);
        }

        topGenres.sort(function(a, b) {
            return a[1] - b[1];
        });

        return (
            <div className={styles.parentContainer}>
                <div className="flex flex-spread flex-vertical-align">
                    <h3>Genres | Which genres are in your playlists?</h3>
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
                    ref="individualPlaylistGenreTree"
                    className={styles.graphContainer}
                >
                </canvas>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        genresTally: state.getPlaylistBreakdown.breakdownPlaylist.genres.tally,
        genreObjects: state.getPlaylistBreakdown.breakdownPlaylist.genre_objects
    }
};

export default connect(mapStateToProps)(GenreTreeMapIndividual);