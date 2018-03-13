import React from 'react';
import utils from "../../../lib/functionsLibrary";
import { TableCell } from 'material-ui';

export default class CellCreatedUpdated extends React.Component {
    render() {
        const { project, className } = this.props;
        return (
            <TableCell className={className}>
                {utils.toRealDate(project.created_at, true)} <br />
                {utils.toRealDate(project.updated_at, true)}
            </TableCell>
        )
    }
}