import React from 'react';
import { TableCell } from 'material-ui';

export default class CellTags extends React.Component {
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

