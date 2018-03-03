import React from 'react';
import utils from "../../../lib/functionsLibrary";
import { TableCell } from 'material-ui';

export default class CellCreatedUpdated extends React.Component {
    render() {
        const { article, className } = this.props;
        return (
            <TableCell className={className}>
                {utils.toRealDate(article.created_at, true)} <br />
                {utils.toRealDate(article.updated_at, true)}
            </TableCell>
        )
    }
}