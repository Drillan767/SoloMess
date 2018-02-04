import React from 'react';
import Headerlinks from '../lib/headerLinks';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/fontawesome-free-brands'

export default class Header extends React.Component {
    render() {
        let settings = this.props.settings;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        {
                        settings !== null &&
                            [
                                <img src={settings.logo.url} width="30" height="30" alt="" />,
                                settings.base_title
                            ]

                        }
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/articles">Articles</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/portfolio">Portfolio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">A propos de moi</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">Contact</a>
                            </li>

                        </ul>
                        <ul className="navbar-nav my-2 my-lg-0">
                            {
                                settings !== null &&
                                <li className="nav-item">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </li>
                            }

                            <Headerlinks settings={settings} />
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}