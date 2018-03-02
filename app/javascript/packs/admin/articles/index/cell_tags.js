import React from 'react';
import { TableCell } from 'material-ui';

export default class CellTags extends React.Component {
    render() {
        return (
            <TableCell className={classes.cells}>
                {
                    a.tags.split(',').map(function(tag, i) {
                        return (
                            <span className={classes.tag} key={i}>
                                {tag}
                            </span>
                        )
                    })
                }
            </TableCell>
        )
    }
}