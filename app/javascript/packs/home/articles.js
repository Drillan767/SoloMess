import React from 'react';
import utils from '../lib/functionsLibrary';

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {articles: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function(articles) {
            self.setState({articles: articles})
        });

    }

   render() {
        const { articles } = this.state;
       return (
           articles !== null &&
           articles.map(function(article, i){
               return (
                   <div key={i}>
                       <ul>
                           <li>{article.title}</li>
                           <li>{utils.truncate(article.content, 200)}</li>
                           <li>Tags : {article.tags}</li>
                           <li>Written on : {utils.toRealDate(article.created_at)}</li>
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
       )
    }
}