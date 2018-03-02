import React from 'react';
import { TableCell, Checkbox } from 'material-ui';

export default class CellCheckbox extends React.Component {
    render() {
        const { className, isSelected } = this.props;
        return (
            <TableCell padding="checkbox" className={className}>
                <Checkbox checked={isSelected} color="primary"/>
            </TableCell>
        )
    }
}