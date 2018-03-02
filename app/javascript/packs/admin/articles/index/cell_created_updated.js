import React from 'react';
import utils from "../../../lib/functionsLibrary";
import { TableCell } from 'material-ui';

export default class CellCreatedUpdated extends React.Component {
    render() {
        return (
            <TableCell className={classes.cells}>
                {utils.toRealDate(a.created_at, true)} + '<br />' +
                {utils.toRealDate(a.updated_at, true)}
            </TableCell>
        )
    }
}