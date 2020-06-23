import React from 'react';
import styles from './mobilemenu.module.scss';
import { connect } from 'react-redux';

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

  },
  paper: {
    marginRight: theme.spacing(2),
    width: '100%',
    backgroundColor: 'rgba(15,15,15,0.5)'
  },
  popper: {
    width: '100%',
    backgroundColor: 'rgba(15,15,15,0.5)'
  },
  mobileMenuBtn: {
      
  },
  mobileMenuList: {
    backgroundColor: 'rgba(15,15,15,0.0)'
  },
  mobileMenuItem: {
      color: 'rgb(164,164,164)'
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
            // className={classes.mobileMenuBtn}
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

                                {dashboardNavItems.map(navItem => {
                                    return (
                                        <MenuItem 
                                            onClick={()=>{props.pageChange(navItem.navLink); handleClose();}}
                                            className={classes.mobileMenuItem}
                                            >
                                            {navItem.navItem}
                                        </MenuItem>
                                    )
                                })}

                                {musicLibraryNavItems.map(navItem => {
                                    return (
                                        <MenuItem 
                                            onClick={()=>{props.pageChange(navItem.navLink); handleClose();}}
                                            className={classes.mobileMenuItem}
                                            >
                                            {navItem.navItem}
                                        </MenuItem>
                                    )
                                })}

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

const mapDispatchToProps = {
    pageChange,
    clearPlaylist
}

export default MobileMenu;