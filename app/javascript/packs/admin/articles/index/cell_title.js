import React from 'react';
import { TableCell } from 'material-ui';
import { Link } from 'react-router-dom';

export default class CellTitle extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { article, className } = this.props;
        if (article !== nextProps.article || className !== nextProps.className) {
            return true;
        }

        return false;
    }

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