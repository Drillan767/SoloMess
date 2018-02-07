/* eslint no-console:0 */
import React from 'react';
import extractActionName from './lib/extractActionName';
import {elementForActionName} from './lib/elementForActionName';
import Loader from './lib/loader';
import 'popper.js';
import 'bootstrap';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {settings: null};
    }

    componentDidMount() {
        let self = this;
        Loader(window.location.origin + '/settings.json', function(settings) {
            self.setState({settings: settings});
        });
    }

    render() {
        let actionName = extractActionName();
        let Element = elementForActionName[actionName];

        return (
            <Element settings={this.state.settings} value="Bjour" />
        )
    }
}