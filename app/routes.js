import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
// import HomePage from './containers/HomePage';
import ProjectEditPage from './containers/ProjectEditPage';
import ProjectsListPage from './containers/ProjectsListPage';
import ProjectViewPage from './containers/ProjectViewPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectsListPage} />
    <Route path="projects/:projectId" component={ProjectViewPage} />
    <Route path="project-editor(/:projectId)" component={ProjectEditPage} />
  </Route>
);
