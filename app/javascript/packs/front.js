/* eslint no-console:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import extractActionName from './lib/extractActionName';
import {elementForActionName} from './lib/elementForActionName';

let actionName = extractActionName();

let renderElement = function (element, id) {
    ReactDOM.render(
        element,
        document.getElementById(id)
    );
};

console.log("ouais bonsoir");

renderElement(elementForActionName[actionName], actionName);