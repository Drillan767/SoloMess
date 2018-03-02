import React from 'react';
import { TableFooter, TablePagination, TableRow} from 'material-ui';

export default class ArticleIndexFooter extends React.Component {
    render() {
        return (
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
        )
    }
}