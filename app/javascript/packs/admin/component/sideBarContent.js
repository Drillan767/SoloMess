import React from 'react';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider';

import {
    Add, Close, Dashboard, ExitToApp, ExpandLess, ExpandMore,
    Settings, Subject, Person, ViewList, Wallpaper,

} from 'material-ui-icons'

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    links: {
        textDecoration: 'none'
    }
});

class SideBarContent extends React.Component {

    state = {
        portfolio: false,
        articles: false
    };

    collapseArticle = () => {
        this.setState({ articles: !this.state.articles });
    };

    collapsePortfolio = () => {
        this.setState({ portfolio: !this.state.portfolio });
    };

    render() {
        const { classes } = this.props;
        const { articles, portfolio } = this.state;

        return (
            <div>
                <div className="sidebar-head" />
                <Divider />
                <List
                    component="nav"
                >
                    <a href="/admin" className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText inset primary="Dashboard" />
                        </ListItem>
                    </a>
                    <ListItem button onClick={this.collapseArticle}>
                        <ListItemIcon>
                            <Subject />
                        </ListItemIcon>
                        <ListItemText inset primary="Articles" />
                        {articles ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={articles} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <a href="/admin/articles/new" className={classes.links}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Add />
                                    </ListItemIcon>
                                    <ListItemText inset primary="New article" />
                                </ListItem>
                            </a>
                            <a href="/admin/articles" className={classes.links}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ViewList />
                                    </ListItemIcon>
                                    <ListItemText inset primary="All articles" />
                                </ListItem>
                            </a>
                        </List>
                    </Collapse>
                    <ListItem button onClick={this.collapsePortfolio}>
                        <ListItemIcon>
                            <Wallpaper />
                        </ListItemIcon>
                        <ListItemText inset primary="Portfolio" />
                        {portfolio ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={portfolio} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <a href="/admin/project/new" className={classes.links}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Add />
                                    </ListItemIcon>
                                    <ListItemText inset primary="New project" />
                                </ListItem>
                            </a>
                            <a href="/admin/portfolio" className={classes.links}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ViewList />
                                    </ListItemIcon>
                                    <ListItemText inset primary="All projects" />
                                </ListItem>
                            </a>
                        </List>
                    </Collapse>
                    <Divider />
                    <a href="#" className={classes.links}>
                    <ListItem button>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText inset primary="User settings" />
                    </ListItem>
                    </a>
                    <a href="#" className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText inset primary="Website settings" />
                        </ListItem>
                    </a>
                    <Divider />
                    <a href="/" className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <Close />
                            </ListItemIcon>
                            <ListItemText inset primary="Back to website" />
                        </ListItem>
                    </a>
                    <a href="/users/sign_out" className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText inset primary="Logout" />
                        </ListItem>
                    </a>
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(SideBarContent);