import React from 'react';
import styles from './mobilemenu.module.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// the navigation items that are passed into the main nav are stored in this file
import { dashboardNavItems, musicLibraryNavItems } from '../../../NavItems.js';

// methods
import { pageChange } from '../../../actions/pageChangeActions.js';
import { clearPlaylist } from '../../../actions/playlistActions.js';

// imports for Material UI menu
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '10px',
    backgroundColor: 'rgba(15,15,15,0.5)',
    zIndex: '9999'

  },
  paper: {
    marginRight: theme.spacing(2),
    width: '100%',
    zIndex: '9999'
  },
  popper: {
    width: '100%',
    opacity: '95%',
    zIndex: '9999'
  },
  mobileMenuBtn: {
    zIndex: '9999'
  },
  mobileMenuList: {
    backgroundColor: 'rgb(15,15,15)',
    zIndex: '9999'
  },
  mobileMenuItem: {
      color: 'rgb(164,164,164)',
      zIndex: '9999'
  }
}));

const MobileMenu = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
        <div>
            <div 
                className={styles.menuBtnModule}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <MenuIcon fontSize="large" />
                <Button>Menu</Button>
            </div>

            <Popper className={classes.popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList className={classes.mobileMenuList} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                
                                {/* Nav Items mapped from file */}

                                {/* Dashboard pages */}

                                {dashboardNavItems.map(navItem => {
                                    return (
                                        <Link to="/">
                                            <MenuItem 
                                                onClick={()=>{props.pageChange(navItem.navLink); props.clearPlaylist(); handleClose();}}
                                                className={classes.mobileMenuItem}
                                                >
                                                {navItem.navItem}
                                            </MenuItem>
                                        </Link>
                                    )
                                })}

                                {/* Music Playlists Pages */}

                                {musicLibraryNavItems.map(navItem => {
                                    return (
                                        <Link to="/library">
                                            <MenuItem 
                                                onClick={()=>{props.pageChange(navItem.navLink); props.clearPlaylist(); handleClose();}}
                                                className={classes.mobileMenuItem}
                                                >
                                                {navItem.navItem}
                                            </MenuItem>
                                        </Link>
                                    )
                                })}
                                
                                {/* Account Page */}
                                
                                <Link to="/account">
                                    <MenuItem 
                                        onClick={()=>{props.pageChange('/account'); props.clearPlaylist(); handleClose();}}
                                        className={classes.mobileMenuItem}
                                        >
                                        Account Info
                                    </MenuItem>
                                </Link>

                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
            </Popper>
        </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {

    }
};

const mapDispatchToProps = {
    pageChange,
    clearPlaylist
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);