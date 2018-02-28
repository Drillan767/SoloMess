import React from 'react';
import SideBarContent from './sideBarContent';
import { withStyles } from 'material-ui/styles';
import {Hidden, Drawer} from 'material-ui';

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

class Hidden1 extends React.Component {

    render() {
        
        const {classes, mobileOpen} = this.props;

        return (
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    onClose={this.props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    <SideBarContent />
                </Drawer>
            </Hidden>
        )
    }
}

export default withStyles(styles)(Hidden1);

