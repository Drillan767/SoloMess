/* eslint no-console:0 */
import React from 'react';
import {elementForActionName} from './lib/elementForActionName';
import utils from './lib/functionsLibrary'
import 'popper.js';
import 'bootstrap';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {settings: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/settings.json', function(settings) {
            self.setState({settings: settings});
        });
    }

    render() {
        let actionName = utils.extractActionName();
        let Element = elementForActionName[actionName];

        return (
            <Element settings={this.state.settings} />
        )
    }
}