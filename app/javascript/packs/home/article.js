import React from 'react';
import utils from '../lib/functionsLibrary';
import Header from "../layout/header";
import Footer from "../layout/footer";

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {article: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.href + '.json', function(article) {
            self.setState({article: article});
        });
    }

    render() {
        let article = this.state.article;

        return (
            <div>
                <Header settings={this.props.settings} location="articles" shown={article !== null ? article.title : null} />
                {
                    article !== null &&
                    <div>
                        <h1>{article.title}</h1>
                        <p>Tags: {article.tags}</p>
                        <p>{article.content}</p>
                        <img src={article.image.url} alt=""/>
                    </div>
                }
                <div>

                </div>
                <Footer settings={this.props.settings} />
            </div>

        )
    }
}