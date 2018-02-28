import React from 'react';
import utils from '../../lib/functionsLibrary';
import { TableBody, TableRow, TableCell, Chip, withStyles} from 'material-ui';
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
}

class LastArticles extends React.Component {

    shouldComponentUpdate(nextProps) {
        if(this.props.articles !== nextProps.articles) {
            return true;
        }

        if(this.props.classes !== nextProps.classes) {
            return true;
        }

        return false;
    }

    render() {

        let a_prefix = '/admin/articles/';
        const { articles, classes } = this.props;

        return (
            <TableBody>
                {
                    articles !== null &&
                    articles.map(function(article, i) {
                        return (
                            i <= 5 && 
                            <TableRow key={i}>
                                <TableCell>
                                    <a href={article.a_prefix + article.slug}>
                                        {article.title}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    {article.tags}
                                </TableCell>
                                <TableCell>
                                    {
                                        article.public
                                        ? <Chip label="Published" className={classes.chipValid} />
                                        : <Chip label="Draft" className={classes.chipPending} />
                                    }
                                </TableCell>
                                <TableCell>
                                    {utils.toRealDate(article.created_at)}
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

export default withStyles(styles)(LastArticles);