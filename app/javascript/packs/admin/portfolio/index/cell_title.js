import React from 'react';
import { TableCell } from 'material-ui';
import { Link } from 'react-router-dom';

export default class CellTitle extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { project, className } = this.props;
        if (project !== nextProps.project || className !== nextProps.className) {
            return true;
        }

        return false;
    }

    render() {
        const { className, project } = this.props;
        return (
            <TableCell padding="none" className={className}>
                <Link to={'/admin/project/' + project.slug }>
                    {project.title}
                </Link>
            </TableCell>
        )
    }
}