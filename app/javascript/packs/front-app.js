import React from 'react';
import {elementForActionName} from './lib/elementForActionName';
import utils from './lib/functionsLibrary'
import { Route, Switch } from 'react-router-dom';
import Header from './layout/header';
import Footer from './layout/footer';
import HomeIndex from './home/home';
import Articles from './home/articles';
import Article from './home/articles/articles_sidebar';
import Project from './home/portfolio_show';
import Portfolio from './home/portfolio_index';
import Contact from './home/contact';
import NotFound from './home/404';
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
            [
                <Header key={0} settings={settings}/>,
                <main key={1} className="container">
                    <Switch>
                        <Route exact path='/' render={() => <HomeIndex settings={settings} title="Home" /> }/>
                        <Route exact path='/articles' render={() => <Articles settings={settings} title="Articles" /> }/>
                        <Route exact path='/article/:slug' render={() => <Article settings={settings} />} />
                        <Route exact path='/portfolio' render={() => <Portfolio settings={settings} title="Portfolio" /> }/>
                        <Route path='/project/:slug' component={Project} settings={settings}/>
                        <Route exact path='/contact' render={() => <Contact settings={settings} title="Contact"/> }/>
                        <Route component={NotFound} />
                    </Switch>
                </main>,
                <Footer settings={settings} key={2}/>
            ]
        )
    }
}