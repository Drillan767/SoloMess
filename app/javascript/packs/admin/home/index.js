import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
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
        utils.loader(window.location.href + '/articles.json', function(articles) {
            self.setState({articles: articles});
        });

        utils.loader(window.location.href + '/portfolio.json', function(portfolio) {
            self.setState({portfolio: portfolio});
        });
    }

    render() {
        const { classes, settings } = this.props;
        const { portfolio, articles } = this.state;
        let p_prefix = '/admin/project/';
        let a_prefix = '/admin/articles/';
        console.log(articles);

        return (
            [
                <Grid item xs={12} sm={6} key={1}>
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
                            <TableBody>
                                {
                                    articles !== null &&
                                    articles.map(a => {
                                    return (
                                        <TableRow key={a.id}>
                                            <TableCell><a href={a_prefix + a.slug}>{a.title}</a></TableCell>
                                            <TableCell>{a.tags}</TableCell>
                                            <TableCell>
                                                {
                                                    a.public ?
                                                    <Chip label="Published" className={classes.chipValid} /> :
                                                    <Chip label="Draft" className={classes.chipPending} />
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {utils.toRealDate(a.created_at)}
                                            </TableCell>
                                        </TableRow>

                                    );
                                })}
                                <TableRow />
                            </TableBody>
                        </Table>
                        <Table className={classes.table}>
                            <TableBody>
                                {
                                    articles !== null &&
                                    [
                                        <TableRow key={1}>
                                            <TableCell>Total articles</TableCell>
                                            <TableCell><Chip label={articles.length} /></TableCell>
                                        </TableRow>,
                                        <TableRow key={2}>
                                            <TableCell>Published</TableCell>
                                            <TableCell>
                                                <Chip
                                                    className={classes.chipValid}
                                                    label={articles.filter(articles => articles.public !== false).length}
                                                />
                                            </TableCell>
                                        </TableRow>,
                                        <TableRow key={3}>
                                            <TableCell>Unpublished</TableCell>
                                            <TableCell>
                                                <Chip
                                                    className={classes.chipPending}
                                                    label={articles.filter(articles => articles.public !== true).length}
                                                />
                                            </TableCell>
                                        </TableRow>,
                                    ]
                                }
                            </TableBody>
                        </Table>
                        <div className="table-actions">
                            <Button variant="raised" color="primary" href="/admin/articles">
                                See all
                            </Button>
                            <Button variant="raised" color="primary" href="/admin/articles/new">
                                New
                            </Button>
                        </div>
                    </Paper>
                </Grid>,
                <Grid item xs={12} sm={6} key={2}>
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
                            <TableBody>
                                {
                                    portfolio !== null &&
                                    portfolio.map(p => {
                                    return (
                                        p.id <= 5 &&
                                        <TableRow key={p.id}>
                                            <TableCell>
                                                <a href={p_prefix + p.slug}>
                                                    {p.title}
                                                    </a>
                                            </TableCell>
                                            <TableCell>{p.tags}</TableCell>
                                            <TableCell>
                                                {
                                                    p.public ?
                                                        <Chip label="Published" className={classes.chipValid}/> :
                                                        <Chip label="Draft" className={classes.chipPending} />
                                                }
                                            </TableCell>
                                            <TableCell>{utils.toRealDate(p.created_at)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow />
                            </TableBody>
                        </Table>
                        <Table className={classes.table}>
                            <TableBody>
                                {
                                    portfolio !== null &&
                                    [
                                        <TableRow key={1}>
                                            <TableCell>Total projects</TableCell>
                                            <TableCell><Chip label={portfolio.length} /></TableCell>
                                        </TableRow>,
                                        <TableRow key={2}>
                                            <TableCell>Published</TableCell>
                                            <TableCell>
                                                <Chip
                                                    className={classes.chipValid}
                                                    label={portfolio.filter(portfolio => portfolio.public !== false).length}
                                                />
                                            </TableCell>
                                        </TableRow>,
                                        <TableRow key={3}>
                                            <TableCell>Unpublished</TableCell>
                                            <TableCell>
                                                <Chip
                                                    className={classes.chipPending}
                                                    label={portfolio.filter(portfolio => portfolio.public !== true).length}
                                                />
                                            </TableCell>
                                        </TableRow>,
                                    ]
                                }
                            </TableBody>
                        </Table>
                        <div className="table-actions">
                            <Button variant="raised" color="primary" href="/admin/portfolios">
                                See all
                            </Button>
                            <Button variant="raised" color="primary" href="/admin/project/new">
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