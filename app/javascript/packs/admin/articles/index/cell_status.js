import React from 'react';
import { TableCell, Chip } from 'material-ui';

export default class CellStatus extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { article, className, pending, valid } = this.props;

        if (article !== nextProps.article || className !== nextProps.className ||
            pending !== nextProps.pending || valid !== nextProps.valid) {
                return true;
            }

        return false;


    }

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