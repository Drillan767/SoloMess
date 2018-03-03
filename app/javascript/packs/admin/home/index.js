import React from 'react';
import { Grid, withStyles, Paper, Button, Typography,
Table, TableCell, TableHead, TableRow } from 'material-ui';
import LastArticles from './last5articles';
import TotalArticles from './totalarticles';
import LastProjects from './last5projects';
import TotalProjects from './totalprojects';
import { Link } from 'react-router-dom';
import utils from '../../lib/functionsLibrary';
import {green, orange} from 'material-ui/colors';

const styles = {
    titles: {
        padding: '2%',
        backgroundColor: '#3f51b5',
        color: '#fff'
    },
    chipValid: {
        backgroundColor: green[400],
        color: '#fff'
    },
    chipPending: {
        backgroundColor: orange[400],
        color: '#fff'
    }
};

class HomeIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            portfolio: null,
            articles: null,
        }
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function(articles) {
            self.setState({articles: articles});
        });

        utils.loader(window.location.origin + '/all_projects.json', function(portfolio) {
            self.setState({portfolio: portfolio});
        });
    }

    shouldComponentUpdate(nextState, nextProps) {
        if(this.state.portfolio !== nextState.portfolio ||
           this.state.articles !== nextState.articles) {
        
            return true;
        }

        if(this.props.settings !== nextProps.settings ||
            this.props.classes !== nextProps.classes) {
            return true;
        }

        return false;
    }

    render() {
        const { classes, settings } = this.props;
        const { portfolio, articles } = this.state;
        
        return (
            [
                <Grid item lg={6} sm={12} key={1}>
                    <Paper elevation={8}>
                        <Typography
                            variant="headline"
                            component="h3"
                            className={classes.titles}
                        >
                            Articles
                        </Typography>
                        <Typography variant="title" className="table-title">Latest</Typography>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Creation date</TableCell>
                                </TableRow>
                            </TableHead>
                            
                        </Table>
                        <Table className={classes.table}>
                            <LastArticles articles={articles} styles={this.styles} />
                        </Table>
                        <Table className={classes.table}>
                            <TotalArticles articles={articles} />
                        </Table>
                        <div className="table-actions">
                            <Button 
                                variant="raised" 
                                color="primary" 
                                component={Link}
                                to='/admin/articles'
                            >
                                See all
                            </Button>
                            <Button 
                                variant="raised" 
                                color="primary"
                                component={Link}
                                to='/admin/new/article'
                            >
                                New
                            </Button>
                        </div>
                    </Paper>
                </Grid>,
                <Grid item lg={6} sm={12} key={2}>
                    <Paper elevation={8}>
                        <Typography
                            variant="headline"
                            component="h3"
                            className={classes.titles}
                        >
                            Portfolio
                        </Typography>
                        <Typography variant="title" className="table-title">Latest</Typography>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Creation date</TableCell>
                                </TableRow>
                            </TableHead>
                            <LastProjects portfolio={portfolio} />
                        </Table>
                        <Table className={classes.table}>
                            <TotalProjects portfolio={portfolio} />
                        </Table>
                        <div className="table-actions">
                            <Button 
                                variant="raised" 
                                color="primary" 
                                component={Link}
                                to='/admin/portfolios'
                            >
                                See all
                            </Button>
                            <Button 
                                variant="raised" 
                                color="primary"
                                component={Link}
                                to='/admin/project/new'
                            >
                                New
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            ]
        )
    }
}
export default withStyles(styles)(HomeIndex);