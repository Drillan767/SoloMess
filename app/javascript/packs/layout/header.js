import React from 'react';
import Headerlinks from '../lib/headerLinks';
import Breadcrumb from './breadcrumb';

export default class Header extends React.Component {
    render() {
        let settings = this.props.settings;
        let location = this.props.location;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        {
                        settings !== null &&
                            [
                                <img src={settings.logo.url} key={1} width="30" height="30" alt="" />,
                                settings.base_title
                            ]
                        }
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className={"nav-item " + (location === 'article' && 'active') }>
                                {/*{"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}*/}
                                <a className="nav-link" href="/articles">Articles</a>
                            </li>
                            <li className={"nav-item " + (location === 'portfolio' && 'active') }>
                                <a className="nav-link" href="/portfolio">Portfolio</a>
                            </li>
                            <li className={"nav-item "}>
                                <a className="nav-link" href="#">A propos de moi</a>
                            </li>
                            <li className={"nav-item " + (location === 'contact' && 'active') }>
                                <a className="nav-link" href="/contact">Contact</a>
                            </li>
                            {
                                settings !== null && settings.logged_in &&
                                    [
                                        <li className={"nav-item "} key={0}>
                                            <a className="nav-link disabled">|</a>
                                        </li>,
                                        <li className={"nav-item "} key={1}>
                                            <a className="nav-link" href="/admin">Administration</a>
                                        </li>,
                                        <li className={"nav-item "} key={2}>
                                            <a className="nav-link" href="/logout">Déconnexion</a>
                                        </li>
                                    ]
                            }

                        </ul>
                        <Headerlinks settings={settings} />
                    </div>
                </nav>

                <Breadcrumb location={location} shown={this.props.shown}/>
            </div>
        )
    }
}