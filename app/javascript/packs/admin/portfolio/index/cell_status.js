import React from 'react';
import { TableCell, Chip } from 'material-ui';

export default class CellStatus extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { project, className, pending, valid } = this.props;

        if (project !== nextProps.project || className !== nextProps.className ||
            pending !== nextProps.pending || valid !== nextProps.valid) {
                return true;
            }

        return false;


    }

    render() {
        const { project, className, pending, valid } = this.props;
        return (
            <TableCell className={className}>
                {
                    project.public
                        ? <Chip className={valid} label="Published" />
                        : <Chip className={pending} label="Draft" />
                }
            </TableCell>
        )
    }
}