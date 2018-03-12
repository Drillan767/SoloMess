import React from 'react';
import { Grid, TextField } from 'material-ui';

export default class ArticleNewTitle extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        const { className, value } = this.props;
        if(className !== nextProps.className || value !== nextProps.value) {
            return true
        }
        else {
            return false;
        }
    }

    render() {
        const { value, className } = this.props;
        return (
            <Grid item xs={12} sm={8} className={className}>
                <TextField
                    id="article_title"
                    label="Title"
                    name="article[title]"
                    defaultValue={value}
                    fullWidth
                />
            </Grid>
        )
    }
}