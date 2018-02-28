import React from 'react';
import { withStyles } from 'material-ui/styles';
import { TableBody, TableRow, TableCell, Chip } from 'material-ui';
import {green, orange} from 'material-ui/colors';

const styles = {
    chipValid: {
        backgroundColor: green[400],
        color: '#fff'
    },
    chipPending: {
        backgroundColor: orange[400],
        color: '#fff'
    }
};

class TotalArticles extends React.Component {
        
    shouldComponentUpdate(nextProps) {
        if(this.props.articles !== nextProps.articles ||
            this.props.classes !== nextProps.classes) {
            return true;
        }

        return false;
    }

    render() {

        const { articles, classes } = this.props;

        return (
            <TableBody>
                {
                    articles !== null &&
                    [
                        <TableRow key={1}>
                            <TableCell>Total projects</TableCell>
                            <TableCell><Chip label={articles.length} /></TableCell>
                        </TableRow>,
                        <TableRow key={2}>
                            <TableCell>Published</TableCell>
                            <TableCell>
                                <Chip
                                    className={classes.chipValid}
                                    label={articles.filter(a => a.public !== false).length}
                                />
                            </TableCell>
                        </TableRow>,
                        <TableRow key={3}>
                            <TableCell>Unpublished</TableCell>
                            <TableCell>
                                <Chip
                                    className={classes.chipPending}
                                    label={articles.filter(a => a.public !== true).length}
                                />
                            </TableCell>
                        </TableRow>,
                    ]
                }
            </TableBody>
        )
    }
}

export default withStyles(styles)(TotalArticles);