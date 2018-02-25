import React from 'react';
import Headerlinks from '../lib/headerLinks';
import Breadcrumb from './breadcrumb';
import { Route, Link } from "react-router-dom";

export default class Header extends React.Component {
    render() {
        const { settings } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to={'/'} className="navbar-brand">
                        {
                            settings !== null &&
                            [
                                <img src={settings.logo.url} key={1} width="30" height="30" alt="" />,
                                settings.base_title
                            ]
                        }
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className={"nav-item"}>
                                <Link to='/articles' className="nav-link">Articles</Link>
                            </li>
                            <li className={"nav-item"}>
                                <Link to='/portfolio' className="nav-link">Portfolio</Link>
                            </li>
                            <li className={"nav-item"}>
                                <Link to='/about' className="nav-link">About me</Link>
                            </li>
                            <li className={"nav-item"}>
                                <Link to='/contact' className="nav-link">Contact</Link>
                            </li>
                            {
                                settings !== null && settings.logged_in &&
                                [
                                    <li className={"nav-item "} key={0}>
                                        <a className="nav-link disabled">|</a>
                                    </li>,
                                    <li className={"nav-item "} key={1}>
                                        <a className="nav-link" href="/admin">Dashboard</a>
                                    </li>,
                                    <li className={"nav-item "} key={2}>
                                        <a className="nav-link" href="/logout">Logout</a>
                                    </li>
                                ]
                            }

                        </ul>
                        <Headerlinks settings={settings} />
                    </div>
                </nav>
            </div>

        )

    }
}

/*
return (

)*/
