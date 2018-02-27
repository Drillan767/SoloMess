import React from 'react';
import {Link, Route} from "react-router-dom";
import utils from '../../lib/functionsLibrary';

// article sidebar

export default class ArticleIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: null,
        }
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function (articles) {
            self.setState({articles: articles.filter(a => a.public)})
        });
    }

    componentWillReceiveProps(newProps) {
        utils.setTitle(newProps.settings.base_title, newProps.title);
    }

    render() {
        const { articles } = this.state;
        const { settings } = this.props;

        return (
            <div id="articles" className="row">

                <div className="col-lg-12 title">
                    <h1>Articles</h1>
                </div>

                {articles !== null &&
                articles.map(function (a, i) {
                    return (
                        <div className="article-index col-sm-3" key={i}>
                            <Link to={`/article/${a.slug}`}>
                                <img src={a.image.url} />
                            </Link>
                            <Link to={`/article/${a.slug}`}>
                                <h2>{a.title}</h2>
                            </Link>
                            <ul className="tags">
                                {
                                    a.tags.split(',').map(function(tag) {
                                        return (
                                            <a href="#" className="tag" key={tag}>
                                                {tag}
                                            </a>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                    )
                })

                }
            </div>

        )
    };
}