import React from 'react';
import { TableCell, Checkbox } from 'material-ui';

export default class CellCheckbox extends React.Component {
    render() {
        return (
            <TableCell padding="checkbox" className={classes.cells}>
                <Checkbox checked={isSelected} color="primary"/>
            </TableCell>
        )
    }
}