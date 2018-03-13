import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { Toolbar, Typography, Tooltip, IconButton} from 'material-ui'
import {lighten} from "material-ui/styles/colorManipulator";
import {withStyles} from "material-ui/styles/index";
import {Delete, AssignmentLate, AssignmentTurnedIn } from 'material-ui-icons';


const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 auto',
    },
    actions: {
        color: theme.palette.text.primary,
    },
    title: {
        flex: '0 0 auto',
    },

});

class EnhancedTableToolbar extends React.Component {

    render() {
        const {selected, classes} = this.props;
        let numSelected = selected.length;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography variant="subheading">{numSelected} selected</Typography>
                    ) : (
                        <Typography variant="title">All projects</Typography>
                    )}
                </div>
                <div className={classes.spacer}/>
                <div className={classes.actions}>
                    {numSelected > 0 && [
                        <Tooltip title="Publish selected" key={1}>
                            <IconButton aria-label="Publish" onClick={() => this.props.handleMultipleActions('publish', selected)}>
                                <AssignmentTurnedIn/>
                            </IconButton>
                        </Tooltip>,
                        <Tooltip title="Unpublish selected" key={2}>
                            <IconButton aria-label="unpublish" onClick={() => this.props.handleMultipleActions('unpublish', selected)}>
                                <AssignmentLate/>
                            </IconButton>
                        </Tooltip>,
                        <Tooltip title="Delete selected" key={3}>
                            <IconButton aria-label="Delete" onClick={() => this.props.handleMultipleActions('delete', selected)}>
                            <Delete/>
                            </IconButton>
                        </Tooltip>
                    ]}
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    selected: PropTypes.array.isRequired,
};

export default withStyles(styles)(EnhancedTableToolbar);