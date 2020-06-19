import React from 'react';
import styles from './featuresradar.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import ReactDOM from 'react-dom';

class FeaturesRadar extends React.Component {

    componentDidMount() {
        this.initializeRadar();
    }

    initializeRadar() {
        let el = ReactDOM.findDOMNode(this.refs.featuresRadar);
        let ctx = el.getContext("2d");
        let radar = new Chart(ctx, {
            type: "radar",
            data: {
                labels: Object.keys(this.props.audioFeaturesTally), // points on radar
                datasets: [
                    {
                        data: Object.values(this.props.audioFeaturesTally),
                        fontColor: 'rgb(213,116,159)',
                        fontSize: 14,
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        borderColor: "rgba(179,181,198,1)",
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
                responsive: true,
                maintainAspectRatio: true,
                title: {
                    display: true,
                    text: "Audio Characteristics"
                },
                legend: {
                    display: false
                },
                scale: {
                    gridLines: {
                        color: ['rgb(213,116,159)','rgb(213,116,159)','rgb(213,116,159)','rgb(213,116,159)','rgb(213,116,159)','rgb(213,116,159)']
                    },
                    ticks: {
                       display: false,
                       max: 1.0,
                       min: 0,
                       stepSize: 0.2
                    },
                    pointLabels: {
                        fontSize: 20
                    },
                },
                tooltips: {
                    callbacks: {
                        title: (item, data) => {
                            return '';
                        },
                        label: (item, data) => {
                            return '';
                        }
                    }
                }
            }
        });
    }

    // find largest value in obj
    getMax(object) {
        // return an array of top repeat song(s)
        return Object.keys(object).filter(x => {
            return object[x] == Math.max.apply(null, 
            Object.values(object));
        });
    }

    render() {
        console.log('features radar props', this.props)
        return (
            <div className={styles.parentContainer}>
                <h3>Audio Characterists | What audio features are usually present in your songs?</h3>
                <div className="flex flex-justify-center">
                    <p><span className={styles.featureTitleRecent}>acousticness</span> - measure of how acoustic the tracks are</p>
                    <p><span className={styles.featureTitleRecent}>danceability</span> - describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity</p>
                    <p><span className={styles.featureTitleRecent}>energy</span> - represents a perceptual measure of intensity and activity (energetic tracks feel fast, loud, and noisy)</p>
                </div>
                <div className="flex flex-vertical-align">    
                    <div className={styles.left}>
                        <p><span className={styles.featureTitleRecent}>instrumentalness</span> - predicts whether a track contains no vocals</p>
                        <br />
                        <p><span className={styles.featureTitleRecent}>liveness</span> - detects the presence of an audience in the recording (live performance)</p>
                        <br />
                        <p><span className={styles.featureTitleRecent}>speechiness</span> - detects the presence of spoken words in a track (talk show, audio book, etc.)</p>
                    </div>
                    <canvas
                        ref="featuresRadar"
                        className={styles.graphContainer}
                    >
                    </canvas>
                </div>
            </div>
        )

    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        recentTracks: state.getRecentlyPlayed.recentlyPlayed.tracks,
        audioFeaturesTally: state.getRecentlyPlayed.recentlyPlayed.features.featuresObj.featuresTally,
        audioFeaturesByTrack: state.getRecentlyPlayed.recentlyPlayed.features.featuresByTrack[0],
    }
};

export default connect(mapStateToProps)(FeaturesRadar);