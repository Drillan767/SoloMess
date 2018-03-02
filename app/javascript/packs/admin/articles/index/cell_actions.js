import React from 'react';
import { TableCell, Button } from 'material-ui';
import {ModeEdit, Delete } from 'material-ui-icons';
import { Link } from 'react-router-dom';

export default class CellActions extends React.Component {
    render() {
        const { className, article, buttons } = this.props;
        return (
            <TableCell className={className}>
                <Button
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="add"
                    className={buttons}
                    component={Link}
                    to={'/admin/article/' + article.slug + '/edit'}
                >
                    <ModeEdit />
                </Button>
                <Button
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="add"
                    className={buttons}
                    onClick={() => this.props.deleteItem(article.id, article.title)}
                >
                    <Delete />
                </Button>
            </TableCell>
        )
    }
}