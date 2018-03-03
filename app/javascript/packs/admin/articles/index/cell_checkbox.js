import React from 'react';
import { TableCell, Checkbox } from 'material-ui';

export default class CellCheckbox extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { className, isSelected } = this.props;

        if (
            className !== nextProps.className ||
            isSelected !== nextProps.isSelected
        ) {
            return true;
        }

        return false;
    }

    render() {
        const { className, isSelected } = this.props;
        return (
            <TableCell padding="checkbox" className={className}>
                <Checkbox checked={isSelected} color="primary"/>
            </TableCell>
        )
    }
}