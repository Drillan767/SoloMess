import React from 'react';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import utils from '../../lib/functionsLibrary';
import { withStyles } from 'material-ui/styles';
import { Link } from "react-router-dom";
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
        textDecoration: 'none',
        color: '#3f51b5'
    },
    active: {
        color: '#3f51b5'
    }
});

class SideBarContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            portfolio: false,
            articles: false
        }
    }

    componentWillMount() {
        let location = utils.basename(window.location.pathname);
        this.setState({
            articles: (location === "article" || location === "articles"),
            portfolio: (location === "portfolio" || location === "project")
        })
    }

    collapseArticle = () => {
        this.setState({ articles: !this.state.articles });
    };

    collapsePortfolio = () => {
        this.setState({ portfolio: !this.state.portfolio });
    };

    render() {
        const { classes } = this.props;
        const { articles, portfolio } = this.state;
        let pathname = window.location.pathname;

        return (
            <div>
                <div className="sidebar-head" />
                <Divider />
                <List component="nav">
                    <Link to={'/admin'} className={classes.links}>
                        <ListItem button>
                            <ListItemIcon>
                                <Dashboard className={pathname === '/admin' ? classes.active : ''}/>
                            </ListItemIcon>
                            <ListItemText
                                inset
                                primary="Dashboard"
                                classes={pathname === '/admin' ? {primary: classes.active} : {}}
                            />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={this.collapseArticle}>
                        <ListItemIcon>
                            <Subject />
                        </ListItemIcon>
                        <ListItemText inset primary="Articles" />
                        {articles ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={articles} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to={'/admin/new/article'} className={classes.links}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Add className={pathname === '/admin/new/article' ? classes.active : ''} />
                                    </ListItemIcon>
                                    <ListItemText
                                        inset
                                        classes={pathname === '/admin/new/article' ? {primary: classes.active} : {}}
                                        primary="New article"
                                    />
                                </ListItem>
                            </Link>
                            <Link to={'/admin/articles'} className={classes.links}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ViewList className={pathname === '/admin/articles' ? classes.active : ''} />
                                    </ListItemIcon>
                                    <ListItemText
                                        inset
                                        classes={pathname === '/admin/articles' ? {primary: classes.active} : {}}
                                        primary="All articles"
                                    />
                                </ListItem>
                            </Link>
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
                            <Link to={'/admin/new/project'} className={classes.links}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Add className={pathname === '/admin/new/project' ? classes.active : ''}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        inset
                                        primary="New project"
                                        classes={pathname === '/admin/new/project' ? {primary: classes.active} : {}}
                                    />
                                </ListItem>
                            </Link>
                            <Link to={'/admin/new/project'} className={classes.links}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ViewList className={pathname === '/admin/portfolio' ? classes.active : ''}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        inset
                                        primary="All projects"
                                        classes={pathname === '/admin/portfolio' ? {primary: classes.active} : {}}
                                    />
                                </ListItem>
                            </Link>
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
                <Divider />
            </div>
        )
    }
}

export default withStyles(styles)(SideBarContent);