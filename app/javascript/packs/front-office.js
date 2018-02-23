import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './front-app';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('index')
);

// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf