import React from 'react';
import PropTypes from 'prop-types';
import SideBarContent from './layout/admin/sideBarContent';
import Top from './layout/admin/appbar';
import utils from './lib/functionsLibrary'
import { Route, Switch } from 'react-router-dom';
import {
    AppBar, Drawer,Grid, Hidden, IconButton, Paper,
    Reboot, Toolbar, Tooltip, Typography, withStyles
} from 'material-ui'
import { Menu, ExitToApp, Close } from 'material-ui-icons'
import AdminIndex from './admin/home/index';

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

    constructor(props) {
        super(props);
        this.state = {
            settings: null,
            mobileOpen: false,
        };
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
        const { settings, mobileOpen } = this.state;
        let pathname = window.location.pathname;
        let title = utils.getTitle(pathname);

        return (
            <div>
                <Reboot />
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <Top 
                            mobileOpen={mobileOpen}
                            title={title}
                            handleDrawerToggle={this.handleDrawerToggle}
                        />
                        <main className={classes.content}>
                            <Paper elevation={4} className="dashboard-paper">
                                <Grid container spacing={24}>
                                    <Switch>
                                        <Route exact path='/admin' render={() => <AdminIndex settings={settings} title={title} /> }/>
                                    </Switch>
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