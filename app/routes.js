import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import ProjectEditPage from './containers/ProjectEditPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/my-projects" component={HomePage} />
    <Route path="/new-project" component={ProjectEditPage} />
    <Route path="/feed" component={HomePage} />
  </Route>
);
