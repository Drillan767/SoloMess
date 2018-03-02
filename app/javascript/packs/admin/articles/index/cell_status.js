import React from 'react';
import { TableCell, Chip } from 'material-ui';

export default class CellStatus extends React.Component {
    render() {
        return (
            <TableCell className={classes.cells}>
                {
                    a.public
                        ? <Chip className={classes.chipValid} label="Published" />
                        : <Chip className={classes.chipPending} label="Draft" />
                }
            </TableCell>
        )
    }
}