import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import Loader from '../lib/loader';

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {articles: null};
    }

    componentDidMount() {
        let self = this;
        Loader(window.location.href + '.json', function(articles) {
            self.setState({articles: articles});
        });
    }

   render() {
        let articles = this.state.articles;

       function truncate(string, nbchar) {
           if (string.length > nbchar)
               return string.substring(0,nbchar)+'...';
           else
               return string;
       }

       function toRealDate(value) {
           let date = new Date(value);
           console.log(date);
           return date.getDate() + ' / ' + (date.getMonth()+1) + ' / ' + date.getFullYear();
       }

        return (
            <div>
                <Header settings={this.props.settings} />
                    <div>
                        {
                            articles !== null &&
                            articles.map(function(article, i){
                                return (
                                    <div key={i}>
                                        <ul>
                                            <li>{article.title}</li>
                                            <li>{truncate(article.content, 200)}</li>
                                            <li>Tags : {article.tags}</li>
                                            <li>Written on : {toRealDate(article.created_at)}</li>
                                            <li>
                                                {article.public ? 'Public' : 'Private'}
                                            </li>
                                            <li>
                                                <a href={window.location.origin + '/article/' + article.slug}>Read article</a>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                <Footer settings={this.props.settings} />
            </div>
        )
    }
}