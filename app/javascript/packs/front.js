/* eslint no-console:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import extractActionName from './lib/extractActionName';
import {elementForActionName} from './lib/elementForActionName';
import 'jquery';
import 'popper.js';
import 'bootstrap';

let actionName = extractActionName();

let renderElement = function (element, id) {
    ReactDOM.render(
        element,
        document.getElementById(id)
    );
};

renderElement(elementForActionName[actionName], actionName);