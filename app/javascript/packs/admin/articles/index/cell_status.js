import React from 'react';
import { TableCell, Chip } from 'material-ui';

export default class CellStatus extends React.Component {
    render() {
        const { article, className, pending, valid } = this.props;
        return (
            <TableCell className={className}>
                {
                    article.public
                        ? <Chip className={valid} label="Published" />
                        : <Chip className={pending} label="Draft" />
                }
            </TableCell>
        )
    }
}