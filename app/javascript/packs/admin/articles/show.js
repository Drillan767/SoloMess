import React from 'react';
import utils from '../../lib/functionsLibrary'

export default class ArticleShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null
        }
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href + '.json', function(article) {
            self.setState({article: article});
        });
    }

    render() {
        console.log(this.state.article);
        return (
            <h1>Bjour</h1>
        )
    }
}