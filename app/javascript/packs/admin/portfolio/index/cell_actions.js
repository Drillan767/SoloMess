import React from 'react';
import { TableCell, Button } from 'material-ui';
import {ModeEdit, Delete } from 'material-ui-icons';
import { Link } from 'react-router-dom';

export default class CellActions extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { className, project, buttons } = this.props;

        if (
            className !== nextProps.className ||
            project !== nextProps.article ||
            buttons !== nextProps.buttons
        ) {
            return true;
        }

        return false;
    }

    render() {
        const { className, project, buttons } = this.props;
        return (
            <TableCell className={className}>
                <Button
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="add"
                    className={buttons}
                    component={Link}
                    to={'/admin/project/' + project.slug + '/edit'}
                >
                    <ModeEdit />
                </Button>
                <Button
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="add"
                    className={buttons}
                    onClick={() => this.props.deleteItem(project.id, project.title)}
                >
                    <Delete />
                </Button>
            </TableCell>
        )
    }
}