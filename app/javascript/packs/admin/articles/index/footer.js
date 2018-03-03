import React from 'react';
import { TableFooter, TablePagination, TableRow} from 'material-ui';

export default class ArticleIndexFooter extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { articles, page, rowsPerPage } = this.props;

        if(articles !== nextProps.articles || page !== nextProps.page || rowsPerPage !== nextProps.rowsPerPage) {
            return true;
        }

        return false;
    }

    render() {
        const { articles, rowsPerPage, page } = this.props;
        return (
            <TableFooter>
                <TableRow>
                    {
                        articles !== null &&
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
                            onChangePage={event => this.props.handleChangePage(event, page)}
                            onChangeRowsPerPage={event => this.props.onChangeRowsPerPage(event)}
                        />
                    }
                </TableRow>
            </TableFooter>
        )
    }
}