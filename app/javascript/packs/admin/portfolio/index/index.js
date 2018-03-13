import React from 'react';
import utils from '../../../lib/functionsLibrary';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
} from 'material-ui/Table';
import Grid from 'material-ui/Grid'
import {green, orange} from 'material-ui/colors';
import EnhancedTableHead from './tableHead';
import EnhancedTableToolbar from './toolbar';
import $ from "jquery";
import TableTop from './tableTop';
import swal from 'sweetalert2';
import Footer from './footer';
import Row from './row';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },

    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },

    cells: {
        padding: '4px 24px'
    },
});

class EnhancedTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'title',
            selected: [],
            projects: null,
            page: 0,
            filteredProjectss: null,
            rowsPerPage: 5,
            search: ''
        };
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_projects.json', function(projects) {
            self.setState({projects: projects});
        })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const projects =
            order === 'desc'
                ? this.state.projects.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.projects.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ projects, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.projects.map(n => n.id) });
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
                    $.ajax({ url: '/admin/projects/multiple/' + action,
                    data: {'data': payload},
                    type: 'POST',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', utils.getCSRF())},

                    }).done(function(response) {
                        swal(
                            'Done!',
                            payload.length + ' element(s) have successfully been ' + action + 'ed',
                            'success'
                        );
                        self.setState({projects: response});
                    });
                })
            }
        });
    }

    handleFilterInput(value) {
        this.setState({input: value});
        const { projects } = this.state;
        let filtered = projects.filter(
            (project) => {
                return (
                    project.title.toLowerCase().indexOf(value.toLowerCase()) !== -1

                    /*||
                    utils.toRealDate(project.created_at, true).indexOf(input.toLowerCase()) !== -1 ||
                    utils.toRealDate(project.updated_at, true).indexOf(input.toLowerCase()) !== -1 ||
                    project.tags.split(',').map(function(tag) {
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
                    $.ajax({ url: '/admin/projects/'+ id +'/ajax_delete',
                        type: 'POST',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', utils.getCSRF())},
                    }).done(function(response) {
                        swal(
                            'Done!',
                            '"' + title + '" have successfully been deleted',
                            'success'
                        );
                        self.setState({projects: response});
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

    shouldComponentUpdate(nextState, nextProps) {
        const { projects, order, orderBy, page, rowsPerPage, search, selected } = this.state;
        const { classes, settings, title } = this.props;

        if (
            projects !== nextState.projects || order !== nextState.order || 
            orderBy !== nextState.orderBy || page !== nextState.page ||
            rowsPerPage !== nextState.rowsPerPage || search !== nextState.search || 
            selected !== nextState.selected
        ) {
            return true;
        }

        if (
            classes !== nextProps.classes || settings !== nextProps.settings || title !== nextProps.title
        ) {
            return true;
        }

        return false;
        
    }

    render() {
        const { classes } = this.props;
        const { projects, order, orderBy, selected, rowsPerPage, page, filteredProjects } = this.state;

        let data = this.state.input ? filteredProjects : projects;

        return (
            <Grid item xs={12}>
                <TableTop handleFilterInput={this.handleFilterInput.bind(this)}/>
                <EnhancedTableToolbar 
                    selected={selected} 
                    handleMultipleActions={this.handleMultipleActions.bind(this)}
                />
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
                            <Row
                                data={data}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                selected={selected}
                                isSelected={this.isSelected.bind(this)}
                                deleteItem={this.deleteItem.bind(this)}
                                handleClick={this.handleClick.bind(this)}
                            />

                            <Footer
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage.bind(this)}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                                projects={projects}
                            />
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