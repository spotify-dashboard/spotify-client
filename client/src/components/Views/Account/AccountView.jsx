import React from 'react';
import styles from './account.module.scss';
import { connect } from 'react-redux';
import Banner from '../../Global/Banner/Banner.jsx';
import Login from '../../Login/Login.jsx';
import MobileMenu from '../../Global/MobileMenu/MobileMenu.jsx';

// media queries
import { useMediaPredicate } from "react-media-hook";

const AccountView = props => {

    // MEDIA QUERY SIZING
    const mobileMediaQuery = useMediaPredicate("(max-width: 500px)");
    const desktopTabletQuery = useMediaPredicate("(min-width: 501px) and (max-width: 1500px)");

    return (
        <div className="mainSection">
            <div className="mainModule">
                <Banner />

                {mobileMediaQuery && <MobileMenu />}

                <h1 className={styles.title}>Account Information</h1>
                <div className="divider"></div>
                <div className={styles.accountView}>
                    {props.isLoggedIn && props.profile.display_name !== undefined &&
                    <div>
                        <div className="flex flex-vertical-align">
                            <h4 className="small-margin-sides">Display Name:</h4>
                            <p className="textGrey small-margin-sides">{props.profile.display_name}</p>
                        </div>
                        <div className="flex flex-vertical-align">
                            <h4 className="small-margin-sides">Email Address:</h4>
                            <p className="textGrey small-margin-sides">{props.profile.email}</p>
                        </div>
                        <div className="flex flex-vertical-align">
                            <h4 className="small-margin-sides">Country:</h4>
                            <p className="textGrey small-margin-sides">{props.profile.country}</p>
                        </div>
                        <div className="flex flex-vertical-align">
                            <h4 className="small-margin-sides">Spotify ID:</h4>
                            <p className="textGrey small-margin-sides">{props.profile.id}</p>
                        </div>
                        <div className="flex flex-vertical-align">
                            <h4 className="small-margin-sides">Subscription:</h4>
                            <p className="textGrey small-margin-sides">{props.profile.product === 'open' ? 'Free' : 'Paid'}</p>
                        </div>
                        <a href={props.profile.external_urls.spotify}>
                            <button className="green-btn">View Account on Spotify</button>
                        </a>
                    </div>
                    }
                    {!props.isLoggedIn &&
                        <div>
                            <h2>Sign in to view account information</h2>
                            <Login />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.pageChange.currentPage,
        profile: state.getProfile.profile,
        isLoggedIn: state.loginCheck.loggedIn.isLoggedIn,
    };
};

export default connect(mapStateToProps)(AccountView);