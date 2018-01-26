/* eslint no-console:0 */
import React from 'react';
import extractActionName from './lib/extractActionName';
import {elementForActionName} from './lib/elementForActionName';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {settings: null};
    }

    componentDidMount() {
        $.getJSON(window.location.href + '/settings.json', (data) => {
            this.setState({settings: data});
        })
    }

    render() {
        let actionName = extractActionName();
        let Element = elementForActionName[actionName];

        return (
            <Element settings={this.state.settings} value="Bjour" />
        )
    }
}