import React from 'react';
import utils from '../../lib/functionsLibrary';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import Grid from 'material-ui/Grid'
import Checkbox from 'material-ui/Checkbox';
import Delete from 'material-ui-icons/Delete';
import ModeEdit from 'material-ui-icons/ModeEdit'
import Button from 'material-ui/Button';
import {green, orange} from 'material-ui/colors';
import EnhancedTableHead from './component/tableHead';
import EnhancedTableToolbar from './component/toolbar';
import $ from "jquery";
import TableTop from './component/tableTop';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    tag: {
        paddingLeft: '6px',
        paddingRight: '6px',
        marginRight: '2px'
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    cells: {
        padding: '4px 24px'
    },
    chipValid: {
        backgroundColor: green[400],
        color: '#fff'
    },
    chipPending: {
        backgroundColor: orange[400],
        color: '#fff'
    }
});

class EnhancedTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'title',
            selected: [],
            settings: null,
            articles: null,
            page: 0,
            input: null,
            rowsPerPage: 5,
        };
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/settings.json', function(settings) {
            self.setState({settings: settings});
        });
        utils.loader(window.location.href + '.json', function(articles) {
            self.setState({articles: articles});
        })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const articles =
            order === 'desc'
                ? this.state.articles.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.articles.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ articles, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.articles.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleMultipleActions(action, payload) {
        let self = this;
        $.ajax({ url: '/admin/articles/multiple/' + action + '/' + payload,
            type: 'GET',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', utils.getCSRF())},
            data: payload,
            success: function(response) {
                self.setState({articles: response});
            },
        });
    }

    handleFilterInput(value) {
        this.setState({input: value}, () => {
            // Mettre le filtre ici
        });
    }

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { articles, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, (articles !== null && articles.length) - page * rowsPerPage);
        let base = "/admin/articles/";

        return (
            <Grid item xs={12}>
                <TableTop handleFilterInput={this.handleFilterInput.bind(this)}/>
                <EnhancedTableToolbar selected={selected} handleMultipleActions={this.handleMultipleActions.bind(this)}/>
                {
                    articles !== null &&
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={articles.length}
                            />
                            <TableBody>
                                {articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(a => {
                                    const isSelected = this.isSelected(a.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, a.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={a.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox" className={classes.cells}>
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell padding="none" className={classes.cells}>
                                                <a href={base + a.slug}>
                                                    {a.title}
                                                </a>
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {
                                                    a.tags.split(',').map(function(tag, i) {
                                                        return (
                                                            <Chip
                                                                label={tag}
                                                                key={i}
                                                                className={classes.tag}
                                                            />
                                                        )
                                                    })
                                                }
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {
                                                    a.public
                                                    ? <Chip className={classes.chipValid} label="Published" />
                                                    : <Chip className={classes.chipPending} label="Draft" />
                                                }
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {utils.truncate(a.content, 50)}
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {utils.toRealDate(a.created_at, true)}
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {utils.toRealDate(a.updated_at, true)}
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                <Button
                                                    variant="fab"
                                                    mini
                                                    color="primary"
                                                    aria-label="add"
                                                    className={classes.button}
                                                    href={base + a.slug + "/edit"}
                                                >
                                                    <ModeEdit />
                                                </Button>
                                                <Button
                                                    variant="fab"
                                                    mini
                                                    color="primary"
                                                    aria-label="add"
                                                    className={classes.button}
                                                    href={base + a.slug + "/delete"}
                                                >
                                                    <Delete />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={8} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={8}
                                        count={articles.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                }
            </Grid>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);