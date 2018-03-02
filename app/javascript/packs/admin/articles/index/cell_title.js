import React from 'react';
import { TableCell } from 'material-ui';

export default class CellTitle extends React.Component {
    render() {
        return (
            <TableCell padding="none" className={classes.cells}>
                <a href={base + a.slug}>
                    {a.title}
                </a>
            </TableCell>
        )
    }
}