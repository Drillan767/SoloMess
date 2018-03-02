import React from 'react';
import utils from "../../../lib/functionsLibrary";
import Row from './row';


export default class ArticleIndexBody extends React.Component {
    render() {
        return (
            <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(a => {
                    const isSelected = this.isSelected(a.id);
                    return (
                        <Row />
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={8} />
                    </TableRow>
                )}
            </TableBody>
        )
    }
}