import React from 'react';
import utils from "../../../lib/functionsLibrary";

export default class ArticlesIndexRow extends React.Component {
    render() {
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
                <TableCell padding="checkbox" className={classes.cells}>
                    <Checkbox checked={isSelected} color="primary"/>
                </TableCell>
                <TableCell padding="none" className={classes.cells}>
                    <a href={base + a.slug}>
                        {a.title}
                    </a>
                </TableCell>
                <TableCell className={classes.cells}>
                    {
                        a.tags.split(',').map(function(tag, i) {
                            return (
                                <span className={classes.tag} key={i}>
                                                                {tag}
                                                            </span>
                            )
                        })
                    }
                </TableCell>
                <TableCell className={classes.cells}>
                    {
                        a.public
                            ? <Chip className={classes.chipValid} label="Published" />
                            : <Chip className={classes.chipPending} label="Draft" />
                    }
                </TableCell>
                <TableCell className={classes.cells}>
                    {utils.toRealDate(a.created_at, true)}
                </TableCell>
                <TableCell className={classes.cells}>
                    {utils.toRealDate(a.updated_at, true)}
                </TableCell>
                <TableCell className={classes.cells}>
                    <Button
                        variant="fab"
                        mini
                        color="primary"
                        aria-label="add"
                        className={classes.button}
                        href={base + a.slug + "/edit"}
                    >
                        <ModeEdit />
                    </Button>
                    <Button
                        variant="fab"
                        mini
                        color="primary"
                        aria-label="add"
                        className={classes.button}
                        onClick={() => this.deleteItem(a.id, a.title)}
                    >
                        <Delete />
                    </Button>
                </TableCell>
            </TableRow>
        )
    }
}