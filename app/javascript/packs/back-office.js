import React from 'react';
import ReactDOM from 'react-dom';
import App from './back-app';
import utils from './lib/functionsLibrary';

let actionName = utils.extractAdminActionName();

console.log(actionName);

ReactDOM.render(
    <App />,
    document.getElementById(actionName)
);