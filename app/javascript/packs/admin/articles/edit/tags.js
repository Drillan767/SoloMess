import React from 'react';
import { Grid, TextField } from 'material-ui';

export default class ArticleEditTags extends React.Component {

    shouldComponentUpdate(nextProps) {
        if(this.props.className !== nextProps.className || this.props.value !== nextProps.value) {
            return true
        }

        else {
            return false
        }
    }

    render() {
        const { className, value } = this.props;
        console.log(this.props)
        return (
            <Grid item xs={12} sm={8} className={className}>
                <TextField
                    label="Tags"
                    id="article_tags"
                    name="article[tags]"
                    fullWidth
                    helperText="Separate each tag with a comma"
                    defaultValue={value}
                />
            </Grid>
        )
    }
}