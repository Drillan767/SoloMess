import React from 'react';
import PropTypes from 'prop-types';
import {adminElements} from './lib/elementForActionName';
import SideBarContent from './admin/component/sideBarContent';
import utils from './lib/functionsLibrary'

import {
    AppBar, Drawer,Grid, Hidden, IconButton, Paper,
    Reboot, Toolbar, Tooltip, Typography, withStyles
} from 'material-ui'

import { Menu, ExitToApp, Close } from 'material-ui-icons'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            // TODO: Agir ici
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };

    constructor(props) {
        super(props);
        this.state = {settings: null};
    }

    componentDidMount() {
        let self = this;
        utils.getSettings(function (settings) {
            self.setState({settings: settings});
        })
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes, theme } = this.props;
        let actionName = utils.extractAdminActionName();
        let Element = adminElements[actionName].object;
        let title = adminElements[actionName].title;
        console.log(this.state.settings);

        return (
            <div>
                <Reboot />
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerToggle}
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
                        <Hidden mdUp>
                            <Drawer
                                // TODO: Agir ici
                                variant="temporary"
                                open={this.state.mobileOpen}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                onClose={this.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                <SideBarContent />
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                // TODO: Agir ici
                                variant="permanent"
                                open
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <SideBarContent />
                            </Drawer>
                        </Hidden>
                        <main className={classes.content}>
                            <Paper elevation={4} className="dashboard-paper">
                                <Grid container spacing={24}>
                                    <Element settings={this.state.settings} />
                                </Grid>
                            </Paper>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);