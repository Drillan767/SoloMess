import React from 'react';
import {elementForActionName} from './lib/elementForActionName';
import utils from './lib/functionsLibrary'
import { Route, Switch } from "react-router-dom";
import Header from './layout/header';
import Footer from './layout/footer';
import HomeIndex from './home/home';
import Articles from './home/articles';
import Portfolio from './home/portfolio_index';
import Contact from './home/contact';
import 'popper.js';
import 'bootstrap';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: null
        };
    }

    componentDidMount() {
        let self = this;
        utils.getSettings(function (settings) {
            self.setState({settings: settings});
        })
    }

    render() {
        const { settings } = this.state;
        return (
            <main>
                <Header settings={settings}/>
                <Switch>
                    <Route exact path='/' component={HomeIndex} settings={settings}/>
                    <Route exact path='/articles' component={Articles} settings={settings}/>
                    <Route exact path='/portfolio' component={Portfolio} settings={settings}/>
                    <Route exact path='/contact' component={Contact} settings={settings}/>
                </Switch>
                <Footer settings={settings}/>
            </main>
        )
    }
}