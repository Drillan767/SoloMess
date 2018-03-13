import React from 'react';
import { TableCell } from 'material-ui';

export default class CellTags extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { project, className, tags } = this.props;
        if (project !== nextProps.project || className !== nextProps.className || tags !== nextProps.tags) {
            return true;
        }

        return false;
    }

    render() {
        const { project, className, tags } = this.props;
        return (
            <TableCell className={className}>
                {
                    project.tags.split(',').map(function(tag, i) {
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

