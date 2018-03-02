import React from 'react';
import {TableBody, TableRow, TableCell} from 'material-ui';
import Checkbox from './cell_checkbox';
import Title from './cell_title';
import Tags from './cell_tags';
import Status from './cell_status';
import CreatedUpdated from './cell_created_updated';
import Actions from './cell_actions';

export default class ArticlesIndexRow extends React.Component {
    render() {
        const {data, rowsPerPage, page} = this.props;

        return (
            <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(a => {
                    const isSelected = this.isSelected(a.id);
                    return (
                        <TableRow
                            hover
                            onClick={event => this.handleClick(event, a.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={a.id}
                            selected={isSelected}
                        >
                            <Checkbox />
                            <Title />
                            <Tags />
                            <Status />
                            <CreatedUpdated/>
                            <Actions />
                        </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={8} />
                    </TableRow>
                )}
            </TableBody>
        )
    }
}