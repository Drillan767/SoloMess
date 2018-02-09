import React from 'react';
import PropTypes from 'prop-types';
import {adminElementsForActionName} from './lib/elementForActionName';
import utils from './lib/functionsLibrary'
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import Reboot from 'material-ui/Reboot';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import ExitToApp from 'material-ui-icons/ExitToApp';
import SideBarContent from './admin/component/sideBarContent';

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
    state = {
        mobileOpen: false,
    };

    constructor(props) {
        super(props);
        this.state = {settings: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/settings.json', function(settings) {
            self.setState({settings: settings});
        });
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes, theme } = this.props;
        let actionName = utils.extractAdminActionName();
        let Element = adminElementsForActionName[actionName]['object'];
        let title = adminElementsForActionName[actionName]['title'];

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
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="title" color="inherit" noWrap className="sidebar-title">
                                    {title}
                                </Typography>
                                <Tooltip id="tooltip-left" title="Back to website" placement="left">
                                    <a href="/" className="sidebar-backtomain">
                                        <IconButton color="inherit" >
                                            <ExitToApp />
                                        </IconButton>
                                    </a>
                                </Tooltip>
                            </Toolbar>
                        </AppBar>
                        <Hidden mdUp>
                            <Drawer
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
                            <Element settings={this.state.settings} />
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