import React from 'react';
import ReactDOM from 'react-dom';
import App from './back-app';
import utils from './lib/functionsLibrary';
import 'typeface-roboto';
import { BrowserRouter as Router } from 'react-router-dom';

let actionName = utils.extractAdminActionName();

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('home_admin')
);