import React from 'react';
import styles from './refreshdata.module.scss';
import { connect } from 'react-redux';
import { getRecentlyPlayed } from '../../../actions/recentlyPlayedActions.js';

const RefreshData = props => {    
    return (
        <div>
            <button onClick={() => props.getRecentlyPlayed()} className="green-btn">
                Refresh Data
            </button>
        </div>
    )
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {
    getRecentlyPlayed
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshData);