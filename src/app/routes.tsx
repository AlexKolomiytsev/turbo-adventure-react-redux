import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Test from './components/Test/Test';

const routes: JSX.Element =
    <Provider>
        <Router>
            <Route exact path='/' component={ Test } />
        </Router>
    </Provider>;

export default routes;