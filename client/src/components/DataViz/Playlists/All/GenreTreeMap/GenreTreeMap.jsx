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
          return item.listens > 5;
        });
    }

    initializeTree() {
        let el = ReactDOM.findDOMNode(this.refs.allPlaylistsGenreTree);
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
                        label: '# of tracks',
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
                },
                tooltips: {
                    callbacks: {
                        title: (item, data) => {
                            return;
                        },
                        beforeLabel: (tooltipItem, object) => {
                            // index of the hovered item
                            let currentIndex = tooltipItem.index;
                            console.log(object)
                            console.log('item', tooltipItem)
                            // returns the name of the current hovered item
                            return object.datasets[0].data[currentIndex].g;
                        }
                    }
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

        // generate sorted genres and display top 3
        let topGenres = [];
        for (var genre in this.props.genresTally) {
            topGenres.push([genre, this.props.genresTally[genre]]);
        }

        topGenres.sort(function(a, b) {
            return a[1] - b[1];
        });

        console.log('all playlists tree map', this.props)

        return (
            <div className={styles.parentContainer}>
                <div className="flex flex-spread">
                    <h3>Genres | Which genres have you been listening to recently?</h3>
                    <ol className={styles.genreList}>
                        <li className={styles.genreListItem}>{topGenres[topGenres.length-1][0]}</li>
                        <li className={styles.genreListItem}>{topGenres[topGenres.length-2][0]}</li>
                        <li className={styles.genreListItem}>{topGenres[topGenres.length-3][0]}</li>
                    </ol>
                </div>
                <canvas
                    ref="allPlaylistsGenreTree"
                    className={styles.graphContainer}
                >
                </canvas>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        genresTally: state.getPlaylistBreakdown.breakdownAll.genres,
        genreObjects: state.getPlaylistBreakdown.breakdownAll.genre_objects
    }
};

export default connect(mapStateToProps)(GenreTreeMap);