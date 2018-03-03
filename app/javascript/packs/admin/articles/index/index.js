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
            articles: null,
            page: 0,
            filteredArticles: null,
            rowsPerPage: 5,
            search: ''
        };
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function(articles) {
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
                    $.ajax({ url: '/admin/articles/multiple/' + action,
                    data: {'data': payload},
                    type: 'POST',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', utils.getCSRF())},

                    }).done(function(response) {
                        swal(
                            'Done!',
                            payload.length + ' element(s) have successfully been ' + action + 'ed',
                            'success'
                        );
                        self.setState({articles: response});
                    });
                })
            }
        });
    }

    handleFilterInput(value) {
        this.setState({input: value});
        const { articles } = this.state;
        let filtered = articles.filter(
            (article) => {
                return (
                    article.title.toLowerCase().indexOf(value.toLowerCase()) !== -1

                    /*||
                    utils.toRealDate(article.created_at, true).indexOf(input.toLowerCase()) !== -1 ||
                    utils.toRealDate(article.updated_at, true).indexOf(input.toLowerCase()) !== -1 ||
                    article.tags.split(',').map(function(tag) {
                        tag.toLowerCase().indexOf(input.toLowerCase()) != -1;
                    })*/
                )
            }
        );
        this.setState({filteredArticles: filtered});
        console.log(filtered);
    }

    deleteItem(id, title) {
        console.log('ouais');
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
                    $.ajax({ url: '/admin/articles/'+ id +'/ajax_delete',
                        type: 'POST',
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', utils.getCSRF())},
                    }).done(function(response) {
                        swal(
                            'Done!',
                            '"' + title + '" have successfully been deleted',
                            'success'
                        );
                        self.setState({articles: response});
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
        console.log(page);
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    shouldComponentUpdate(nextState, nextProps) {
        const { articles, order, orderBy, page, rowsPerPage, search, selected } = this.state;
        const { classes, settings, title } = this.props;

        if (
            articles !== nextState.article || order !== nextState.order || 
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
        const { articles, order, orderBy, selected, rowsPerPage, page, filteredArticles } = this.state;

        // console.log(this.props);

        let data = this.state.input ? filteredArticles : articles;

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
                                articles={articles}
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