import React from 'react';
import utils from '../../lib/functionsLibrary';
import { TableBody, TableRow, TableCell, Chip, withStyles} from 'material-ui';
import {green, orange} from 'material-ui/colors';
import { Link } from "react-router-dom";

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

class LastProjects extends React.Component {

    shouldComponentUpdate(nextProps) {
        if(this.props.portfolio !== nextProps.portfolio ||
            this.props.classes !== nextProps.classes
        ) {
            return true;
        }
        return false;
    }

    render() {

        const { classes, portfolio } = this.props;

        return (
            <TableBody>
                {
                    portfolio !== null &&
                    portfolio.map(function(project, i) {
                        return (
                            i <= 5 && 
                            <TableRow key={i}>
                                <TableCell>
                                    <Link to={'/admin/project/' + project.slug}>
                                        {project.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {project.tags}
                                </TableCell>
                                <TableCell>
                                    {
                                        project.public
                                        ? <Chip label="Published" className={classes.chipValid} />
                                        : <Chip label="Draft" className={classes.chipPending} />
                                    }
                                </TableCell>
                                <TableCell>
                                    {utils.toRealDate(project.created_at)}
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
                <TableRow />
            </TableBody>
        )
    }
}

export default withStyles(styles)(LastProjects);