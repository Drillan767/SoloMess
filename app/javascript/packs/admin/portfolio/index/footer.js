import React from 'react';
import { TableFooter, TablePagination, TableRow} from 'material-ui';

export default class ArticleIndexFooter extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { projects, page, rowsPerPage } = this.props;

        if(projects !== nextProps.projects || page !== nextProps.page || rowsPerPage !== nextProps.rowsPerPage) {
            return true;
        }

        return false;
    }

    render() {
        const { projects, rowsPerPage, page } = this.props;
        return (
            <TableFooter>
                <TableRow>
                    {
                        projects !== null &&
                        <TablePagination
                            colSpan={8}
                            count={projects.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={event => this.props.handleChangePage(event, page)}
                            onChangeRowsPerPage={event => this.props.onChangeRowsPerPage(event)}
                        />
                    }
                </TableRow>
            </TableFooter>
        )
    }
}