/* eslint no-console:0 */
import React from 'react';
import {elementForActionName} from './lib/elementForActionName';
import utils from './lib/functionsLibrary'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeIndex from './home/home';
import Header from './layout/header';
import Footer from './layout/footer';
import 'popper.js';
import 'bootstrap';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {settings: null};
    }

    componentDidMount() {
        let self = this;
        utils.getSettings(function (settings) {
            self.setState({settings: settings});
        })
    }

    render() {
        let path = utils.getPathName();
        let Element = elementForActionName[path];
        const { settings } = this.state;
        return (
            <Router>
                <div>
                    <Route path="/" render={
                        ()=> <div>
                                <Header settings={settings}/>
                                <HomeIndex settings={settings}/>
                                <Footer settings={settings}/>
                            </div>
                    }/>
                </div>
            </Router>
        )
    }
}