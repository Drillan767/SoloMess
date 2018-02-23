import React from 'react';
import utils from '../lib/functionsLibrary';

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {article: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function(article) {
            self.setState({article: article.find(a => a.slug === self.props.match.params.slug)});
        });
    }

    render() {
        const { article } = this.state;

        return (
            article !== null &&
            <div>
                <h1>{article.title}</h1>
                <p>Tags: {article.tags}</p>
                <p>{article.content}</p>
                <img src={article.image.url} alt=""/>
            </div>

        )
    }
}