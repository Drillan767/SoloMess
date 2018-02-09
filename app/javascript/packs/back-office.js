import React from 'react';
import ReactDOM from 'react-dom';
import App from './back-app';
import utils from './lib/functionsLibrary';

let actionName = utils.extractAdminActionName();

ReactDOM.render(
    <App />,
    document.getElementById(actionName)
);