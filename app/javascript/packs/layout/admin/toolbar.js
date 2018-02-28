import React from 'react';
import { withStyles } from 'material-ui/styles'
import { AppBar, IconButton, Typography, Toolbar, Tooltip} from 'material-ui';
import { Menu, Close, ExitToApp } from 'material-ui-icons';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 430,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
    appBar: {
      position: 'absolute',
      marginLeft: drawerWidth,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    navIconHide: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up('md')]: {
        position: 'relative',
      },
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
    },
  });

class MainBar extends React.Component {

    render() {

        const { classes, title } = this.props;

        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.props.handleDrawerToggle}
                        className={classes.navIconHide}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap className="sidebar-title">
                        {title}
                    </Typography>
                    <Tooltip id="tooltip-left" title="Back to website" placement="bottom">
                        <a href="/" className="sidebar-backtomain">
                            <IconButton color="inherit" >
                                <Close />
                            </IconButton>
                        </a>
                    </Tooltip>
                    <Tooltip id="tooltip-left" title="Logout" placement="bottom">
                        <a href="/logout" className="sidebar-backtomain">
                            <IconButton color="inherit" >
                                <ExitToApp />
                            </IconButton>
                        </a>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(MainBar);