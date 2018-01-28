import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Test from './components/Test/Test';

const routes: JSX.Element =
    <BrowserRouter>
        <Route exact path='/' component={ Test } />
    </BrowserRouter>;

export default routes;