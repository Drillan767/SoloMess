import React from 'react';
import { Button, Toolbar, TextField, withStyles } from 'material-ui';
import Add from 'material-ui-icons/Add';
import { Link } from 'react-router-dom'

const styles = theme => ({

    root: {
        flex: '1 1 auto',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class TableTop extends React.Component {

    onFieldChange(event) {
        this.props.handleFilterInput(event.target.value);
    }

    render() {
        const { classes } = this.props;
        return (
            <Toolbar>
                <div className={classes.root}>
                    <TextField
                        label="Search"
                        margin="normal"
                        name="search"
                        onChange={this.onFieldChange.bind(this)}
                    />
                </div>

                <div className={classes.root}/>

                <div>
                    <Button
                        variant="raised"
                        color="primary"
                        component={Link}
                        to='/admin/new/article'
                    >
                    New article
                    <Add className={classes.rightIcon} />
                    </Button>
                </div>
            </Toolbar>
        )
    }
}

export default withStyles(styles)(TableTop);