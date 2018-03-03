import React from 'react';
import { TableCell } from 'material-ui';

export default class CellTags extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { article, className, tags } = this.props;
        if (article !== nextProps.article || className !== nextProps.className || tags !== nextProps.tags) {
            return true;
        }

        return false;
    }

    render() {
        const { article, className, tags } = this.props;
        return (
            <TableCell className={className}>
                {
                    article.tags.split(',').map(function(tag, i) {
                        return (
                            <span className={tags} key={i}>
                                {tag}
                            </span>
                        )
                    })
                }
            </TableCell>
        )
    }
}

