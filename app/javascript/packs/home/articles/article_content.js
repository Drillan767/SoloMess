import React from 'react';
import utils from '../../lib/functionsLibrary';
import { faComments, faUserCircle, faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import FontAwesome from '@fortawesome/react-fontawesome';

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            settings: null

        };
    }

    loadArticle = (slug) => {
        let self = this;
        utils.loader(window.location.origin + '/all_articles.json', function (articles) {
            self.setState({
                article: articles.find(a => a.slug === slug)
            });
        });
        utils.getSettings(function(settings) {
            self.setState({settings: settings})
        })
    };

    componentWillReceiveProps(newProps) {
        const {settings, article} = this.state;
        if (this.props.match.params.slug !== newProps.match.params.slug) {
            this.loadArticle(newProps.match.params.slug);
        }
        utils.setTitle(settings.base_title, article.title)
    }

    componentDidMount() {
        this.loadArticle(this.props.match.params.slug);
    }

    render() {
        const { article } = this.state;

        return (
            article !== null &&
            <div className="article-main col-sm-8">
                <div className="header">
                    <h1>{article.title}</h1>
                    <hr/>
                    <p>
                        {
                            article.created_at === article.updated_at
                                ? utils.toRealDate(article.created_at)
                                : utils.toRealDate(article.updated_at)
                        }
                    </p>
                    <ul className="tags">
                        {
                            article.tags.split(',').map(function(tag, i) {
                                return (
                                    <li key={i}>
                                        <a href="#" className="tag">
                                            {tag}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: "<img src=\"" + article.image.url + "\">" + article.content}} />
                <hr />
                <div className="comments row">
                    <FontAwesome icon={faComments} className="col-md-2" size="2x"/>
                    <div className="col-md-8">
                        {/*Créer la boucle des commentaires ici*/}
                        <div className="comment">
                            <h5>
                                <FontAwesome icon={faUserCircle} />
                                John
                            </h5>
                            <hr/>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        <div className="comment">
                            <h5>
                                <FontAwesome icon={faUserCircle} />
                                John
                            </h5>
                            <hr/>
                            <p className="content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                        </div>
                        <FontAwesome icon={faPlusCircle} className="add" size="3x"/>
                    </div>
                </div>
            </div>

        )
    }
}