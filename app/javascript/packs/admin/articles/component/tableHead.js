import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import {lighten} from "material-ui/styles/colorManipulator";
import { TableHead, TableRow, TableCell, Tooltip, Checkbox, TableSortLabel } from 'material-ui';

const columnData = [
    { id: 'title', allowOrder: true, disablePadding: false, label: 'Title' },
    { id: 'tags', allowOrder: false, disablePadding: true, label: 'Tags' },
    { id: 'status', allowOrder: true, disablePadding: false, label: 'Status' },
    { id: 'content', allowOrder: true, disablePadding: false, label: 'Content' },
    { id: 'created_at', allowOrder: true, disablePadding: false, label: 'Created at' },
    { id: 'updated_at', allowOrder: true, disablePadding: false, label: 'Updated at' },
    { id: 'actions', allowOrder: false, disablePadding: false, label: 'Actions' },
];

const styles = {
    selectAll: {
        padding: '0 24px'
    }
};

class EnhancedTableHead extends React.Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox" className={classes.selectAll}>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={column.allowOrder ? this.createSortHandler(column.id) : undefined}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default withStyles(styles)(EnhancedTableHead);