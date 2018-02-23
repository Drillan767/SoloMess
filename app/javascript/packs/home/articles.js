import React from 'react';
import utils from '../lib/functionsLibrary';
import { Link } from "react-router-dom";

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
           <ul>
               {
                   articles !== null &&
                   articles.map(function(a, i){
                       return (
                           <li key={i}>
                               <Link to={`/article/${a.slug}`}>{a.title}</Link>
                           </li>
                       )
                   })
               }
           </ul>

       )
    }
}