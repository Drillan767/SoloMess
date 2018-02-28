import React from 'react';
import { Grid, TextField } from 'material-ui';

export default class ArticleNewTitle extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.className !== nextProps.className;
    }

    render() {
        const { className } = this.props;
        return (
            <Grid item xs={12} sm={8} className={className}>
                <TextField
                    id="article_title"
                    label="Title"
                    name="article[title]"
                    fullWidth
                />
            </Grid>
        )
    }
}