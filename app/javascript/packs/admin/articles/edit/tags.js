import React from 'react';
import { Grid, TextField } from 'material-ui';

export default class ArticleEditTags extends React.Component {

    /*
    shouldComponentUpdate(nextProps) {
        return this.props.className !== nextProps.className;
    }
    

   handleChangeFor = () => (event) => {
       console.log(event.target.value);
        const article = this.props.article;
        article['tags'] = event.target.value;
        this.setState({ article: article });
    };

    */

    render() {
        const { className, article } = this.props;
        console.log(article);
        return (
            <Grid item xs={12} sm={8} className={className}>
                <TextField
                    label="Tags"
                    id="article_tags"
                    name="article[tags]"
                    fullWidth
                    helperText="Separate each tag with a comma"
                    value={article.tags}
                />
            </Grid>
        )
    }
}