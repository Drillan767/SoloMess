import React from 'react';
import { TableCell } from 'material-ui';
import { Link } from 'react-router-dom';

export default class CellTitle extends React.Component {
    render() {
        const { className, article } = this.props;
        return (
            <TableCell padding="none" className={className}>
                <Link to={'/admin/article/' + article.slug }>
                    {article.title}
                </Link>
            </TableCell>
        )
    }
}