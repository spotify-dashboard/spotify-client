import React from 'react';
import styles from './banner.module.scss';
import Login from '../../Login/Login.jsx';

const Banner = props => {

    return (
        <div className={styles.banner}>
            <div className="flex flex-vertical-align flex-spread">
                <div className="flex flex-vertical-align">
                {props.profile !== undefined && props.profile.images !== undefined &&
                    <img className={styles.profileImg} src={props.profile.images[0].url} />
                }
                {props.profile &&
                <h1 className={styles.profileName}>{props.profile.display_name}</h1>
                }
                </div>
                <Login />
            </div>
        </div>
    )
};

export default Banner;