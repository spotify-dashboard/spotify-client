import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';

ReactDOM.render((
    <Provider store={store}>
    <Router>
        <App />
    </Router>
    </Provider>
    ), document.getElementById('app'));