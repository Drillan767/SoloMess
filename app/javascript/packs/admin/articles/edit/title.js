import React from 'react';
import { Grid, TextField } from 'material-ui';

export default class ArticleNewTitle extends React.Component {

   /* shouldComponentUpdate(nextProps) {
        return this.props.className !== nextProps.className;
    } 

    handleChangeFor = () => (event) => {
        const article = this.props.article;
        article['title'] = event.target.value;
        this.setState({ article: article });
    };

    */

    constructor(props) {
        super(props);
        this.fieldChange = this.fieldChange.bind(this);
    }

    fieldChange(event) {
        this.props.handleChange('title', event.target.value)
    }

    render() {
        const { value, className } = this.props;
        return (
            <Grid item xs={12} sm={8} className={className}>
                <TextField
                    id="article_title"
                    label="Title"
                    name="article[title]"
                    value={value}
                    onChange={this.fieldChange}
                    fullWidth
                />
            </Grid>
        )
    }
}