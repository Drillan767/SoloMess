import React from 'react';
import { Grid, TextField } from 'material-ui';

export default class ArticleNewTags extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.className !== nextProps.className;
    }

    render() {
        const { className } = this.props;
        return (
            <Grid item xs={12} sm={8} className={className}>
                <TextField
                    label="Tags"
                    id="article_tags"
                    name="article[tags]"
                    fullWidth
                    helperText="Separate each tag with a comma"
                />
            </Grid>
        )
    }
}