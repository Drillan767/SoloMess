import React from 'react';
import {TableBody, TableRow, TableCell, withStyles } from 'material-ui';
import Checkbox from './cell_checkbox';
import Title from './cell_title';
import Tags from './cell_tags';
import Status from './cell_status';
import CreatedUpdated from './cell_created_updated';
import Actions from './cell_actions';
import {green, orange} from "material-ui/colors/index";

const styles = theme => ({
    cells: {
        padding: '4px 24px'
    },
    chipValid: {
        backgroundColor: green[400],
        color: '#fff'
    },
    chipPending: {
        backgroundColor: orange[400],
        color: '#fff'
    },
    tags: {
        backgroundColor: 'lightgrey',
        padding: '5px 6px',
        marginRight: '5px',
        borderRadius: '16px'
    },
    buttons: {
        margin: theme.spacing.unit,
    },
});

class ProjectsIndexRow extends React.Component {

    
    shouldComponentUpdate(nextProps) {
        const {classes, data, selected, page, rowsPerPage } = this.props;
        if (
            data !== nextProps.data || rowsPerPage !== nextProps.rowsPerPage ||
            page !== nextProps.page || classes !== nextProps.classes ||
            selected !== nextProps.selected || 
            
            classes !== nextProps.classes
        ) {
            return true;
        }

        return false;
    }

    render() {
        const {data, rowsPerPage, page, classes } = this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, (data !== null && data.length) - page * rowsPerPage);
        
        return (
            data !==null &&
            <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function(p, i) {
                    const isSelected = this.props.isSelected(p.id);
                    return (
                        <TableRow
                            hover
                            onClick={event => this.props.handleClick(event, p.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={i}
                            selected={isSelected}
                        >
                            <Checkbox
                                className={classes.cells}
                                isSelected={isSelected}
                            />
                            <Title
                                className={classes.cells}
                                project={p}
                            />
                            <Tags
                                className={classes.cells}
                                tags={classes.tags}
                                project={p}
                            />
                            <Status
                                className={classes.cells}
                                pending={classes.chipPending}
                                valid={classes.chipValid}
                                project={p}
                            />
                            <CreatedUpdated
                                className={classes.cells}
                                project={p}
                            />
                            <Actions
                                className={classes.cells}
                                buttons={classes.buttons}
                                deleteItem={this.props.deleteItem.bind(this)}
                                project={p}
                            />
                        </TableRow>
                    );
                }, this)}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={8} />
                    </TableRow>
                )}
            </TableBody>
        )
    }
}
export default withStyles(styles)(ProjectsIndexRow)