import React from 'react';
import utils from '../../lib/functionsLibrary';
import Article from './article_content';
import {NavLink, Route} from "react-router-dom";
import { faChevronCircleRight } from '@fortawesome/fontawesome-free-solid'
import FontAwesome from '@fortawesome/react-fontawesome';

export default class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {articles: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function (articles) {
            self.setState({articles: articles.filter(a => a.public)})
        });
    }

    render() {
        const {articles} = this.state;
        return (
            <div id="articles" className="row">
                <div className="col-sm-3 article-col">
                    {
                        articles !== null &&
                        articles.map(function (a, i) {
                            return (
                                [
                                    <div className="item" key={i}>
                                        <NavLink to={`/article/${a.slug}`} activeClassName="active">
                                            <h4>
                                                {a.title}
                                                <span>
                                                    <FontAwesome icon={faChevronCircleRight}/>
                                                </span>
                                            </h4>
                                        </NavLink>
                                    </div>,
                                    <hr key={'hr' + i}/>
                                ]
                            )
                        })
                    }
                </div>
                <Route path={`/article/:slug`} component={Article} />
            </div>

        )
    }
}