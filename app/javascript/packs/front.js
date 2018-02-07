import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import utils from './lib/functionsLibrary';

let actionname = utils.extractActionName();

ReactDOM.render(
    <App/>,
    document.getElementById(actionname)
);