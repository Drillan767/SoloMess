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
        utils.getSettings(function (settings) {
            self.setState({settings: settings});
        })
    }

    render() {
        let actionName = utils.extractActionName();
        let Element = elementForActionName[actionName];
        console.log(this.state.settings);
        return (
            <Element settings={this.state.settings} />
        )
    }
}