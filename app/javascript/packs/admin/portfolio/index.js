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
import swal from 'sweetalert2';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    tag: {
        backgroundColor: 'lightgrey',
        padding: '5px 6px',
        marginRight: '5px',
        borderRadius: '16px'
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
            portfolio: null,
            page: 0,
            filteredProjects: null,
            rowsPerPage: 5,
            search: ''
        };
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/settings.json', function(settings) {
            self.setState({settings: settings});
        });
        utils.loader(window.location.href + '.json', function(portfolio) {
            self.setState({portfolio: portfolio});
        })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const portfolio =
            order === 'desc'
                ? this.state.portfolio.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.portfolio.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ portfolio, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.portfolio.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleMultipleActions(action, payload) {
        let self = this;
        swal({
            title: 'Confirm action?',
            text: "You are about to " + action + " " + payload.length + " element(s). Confirm?" ,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            preConfirm: function () {
                return new Promise(function(resolve) {
                    $.ajax({ url: '/admin/portfolio/multiple/' + action + '/' + payload,
                        type: 'POST',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', utils.getCSRF())},
                        data: payload,

                    }).done(function(response) {
                        swal(
                            'Done!',
                            payload.length + ' element(s) have successfully been ' + action + 'ed',
                            'success'
                        );
                        self.setState({portfolio: response});
                    }).fail(function(data) {
                        swal("Oops", "We couldn't connect to the server!", "error");
                    });

                })
            }
        });
    }

    handleFilterInput(value) {
        this.setState({input: value});
        const { portfolio } = this.state;
        let filtered = portfolio.filter(
            (portfolio) => {
                return (
                    portfolio.title.toLowerCase().indexOf(value.toLowerCase()) !== -1

                    /*||
                    utils.toRealDate(article.created_at, true).indexOf(input.toLowerCase()) !== -1 ||
                    utils.toRealDate(article.updated_at, true).indexOf(input.toLowerCase()) !== -1 ||
                    article.tags.split(',').map(function(tag) {
                        tag.toLowerCase().indexOf(input.toLowerCase()) != -1;
                    })*/
                )
            }
        );
        this.setState({filteredProjects: filtered});
    }

    deleteItem(id, title) {
        let self = this;
        swal({
            title: 'Confirm action?',
            text: 'You are about to delete "'+ title +'". Confirm?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            preConfirm: function () {
                return new Promise(function(resolve) {
                    $.ajax({ url: '/admin/portfolio/'+ id +'/ajax_delete',
                        type: 'POST',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', utils.getCSRF())},
                    }).done(function(response) {
                        swal(
                            'Done!',
                            '"' + title + '" have successfully been deleted',
                            'success'
                        );
                        self.setState({portfolio: response});
                    });
                })
            }
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
        const { portfolio, order, orderBy, selected, rowsPerPage, page, filteredProjects } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, (portfolio !== null && portfolio.length) - page * rowsPerPage);
        let base = "/admin/project/";
        let data = this.state.input ? filteredProjects : portfolio;

        return (
            <Grid item xs={12}>
                <TableTop handleFilterInput={this.handleFilterInput.bind(this)}/>
                <EnhancedTableToolbar selected={selected} handleMultipleActions={this.handleMultipleActions.bind(this)}/>
                {
                    data !== null &&
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(p => {
                                    const isSelected = this.isSelected(p.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, p.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={p.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox" className={classes.cells}>
                                                <Checkbox checked={isSelected} color="primary"/>
                                            </TableCell>
                                            <TableCell padding="none" className={classes.cells}>
                                                <a href={base + p.slug}>
                                                    {p.title}
                                                </a>
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {
                                                    p.tags.split(',').map(function(tag, i) {
                                                        return (
                                                            <span className={classes.tag} key={i}>
                                                                {tag}
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {
                                                    p.public
                                                        ? <Chip className={classes.chipValid} label="Published" />
                                                        : <Chip className={classes.chipPending} label="Draft" />
                                                }
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {utils.toRealDate(p.created_at, true)}
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                {utils.toRealDate(p.updated_at, true)}
                                            </TableCell>
                                            <TableCell className={classes.cells}>
                                                <Button
                                                    variant="fab"
                                                    mini
                                                    color="primary"
                                                    aria-label="add"
                                                    className={classes.button}
                                                    href={base + p.slug + "/edit"}
                                                >
                                                    <ModeEdit />
                                                </Button>
                                                <Button
                                                    variant="fab"
                                                    mini
                                                    color="primary"
                                                    aria-label="add"
                                                    className={classes.button}
                                                    onClick={() => this.deleteItem(p.id, p.title)}
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
                                        count={data.length}
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
