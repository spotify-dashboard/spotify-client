import React from 'react';
import { connect } from 'react-redux';
import styles from './banner.module.scss';
import Login from '../../Login/Login.jsx';
import Logout from '../../Global/Logout/Logout.jsx';

const Banner = props => {

    console.log('banner props', props)
    return (
        <div className={styles.banner}>
            <div className="flex flex-vertical-align flex-spread">
                <div className="flex flex-vertical-align">
                {props.isLoggedIn && props.profile !== undefined && props.profile.images !== undefined &&
                    <img className={styles.profileImg} src={props.profile.images[0].url} />
                }
                {props.isLoggedIn && props.profile &&
                <h1 className={styles.profileName}>{props.profile.display_name}</h1>
                }
                </div>

                {props.isLoggedIn &&
                    <Logout />
                }
                {!props.isLoggedIn &&
                    <Login />
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return { 
        profile: state.getProfile.profile,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    };
}

export default connect(mapStateToProps)(Banner);