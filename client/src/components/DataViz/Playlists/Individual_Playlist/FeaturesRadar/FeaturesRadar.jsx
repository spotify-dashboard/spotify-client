import React from 'react';
import styles from './featuresradar.module.scss';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import ReactDOM from 'react-dom';

class FeaturesRadarIndividual extends React.Component {

    componentDidMount() {
        this.initializeRadar();
    }

    initializeRadar() {
        let el = ReactDOM.findDOMNode(this.refs.featuresRadarIndividual);
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
                        pointBackgroundColor: "rgb(207,239,185)",
                        borderColor: "rgba(179,181,198,1)",
                        fontStyle: 'normal',
                        backgroundColor: 'rgb(108,154,243)',
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
                        color: ['rgb(207,239,185)','rgb(207,239,185)','rgb(207,239,185)','rgb(207,239,185)','rgb(207,239,185)','rgb(207,239,185)','rgb(207,239,185)']
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
                    <p><span className="featureTitleIndiv">acousticness</span> - measure of how acoustic the tracks are</p>
                    <p><span className="featureTitleIndiv">danceability</span> - describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity</p>
                    <p><span className="featureTitleIndiv">energy</span> - represents a perceptual measure of intensity and activity (energetic tracks feel fast, loud, and noisy)</p>
                </div>
                <div className="flex flex-vertical-align">    
                    <div className={styles.left}>
                        <p><span className="featureTitleIndiv">instrumentalness</span> - predicts whether a track contains no vocals</p>
                        <br />
                        <p><span className="featureTitleIndiv">liveness</span> - detects the presence of an audience in the recording (live performance)</p>
                        <br />
                        <p><span className="featureTitleIndiv">speechiness</span> - detects the presence of spoken words in a track (talk show, audio book, etc.)</p>
                    </div>
                    <canvas
                        ref="featuresRadarIndividual"
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
        audioFeaturesTally: state.getPlaylistBreakdown.breakdownPlaylist.features.featuresTally,
    }
};

export default connect(mapStateToProps)(FeaturesRadarIndividual);