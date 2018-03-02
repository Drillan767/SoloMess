import React from 'react';
import { TableCell, Button } from 'material-ui';
import {ModeEdit, Delete } from 'material-ui-icons';

export default class CellActions extends React.Component {
    render() {
        return (
            <TableCell className={classes.cells}>
                <Button
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    href={base + a.slug + "/edit"}
                >
                    <ModeEdit />
                </Button>
                <Button
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => this.deleteItem(a.id, a.title)}
                >
                    <Delete />
                </Button>
            </TableCell>
        )
    }
}