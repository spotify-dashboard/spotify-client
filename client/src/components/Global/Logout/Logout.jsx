import React from 'react';
import styles from './logout.module.scss';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../../../actions/logoutActions.js';
import { pageChange } from '../../../actions/pageChangeActions.js';

const Login = props => {
    return (
        <div className={styles.logoutModule}>
            <Link to="/" >
                <button onClick={() => { props.logout(); props.pageChange('/logout') }} className="green-btn">Logout</button>
            </Link>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = {
    logout,
    pageChange
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);