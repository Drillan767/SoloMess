import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './front-app';
import utils from './lib/functionsLibrary';

let actionName = utils.extractActionName();

ReactDOM.render(
    <App/>,
    document.getElementById(actionName)
);