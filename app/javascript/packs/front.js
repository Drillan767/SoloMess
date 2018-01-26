import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'; // à changer
import extractActionName from './lib/extractActionName';

let actionname = extractActionName();

ReactDOM.render(
    <App/>,
    document.getElementById(actionname)
);