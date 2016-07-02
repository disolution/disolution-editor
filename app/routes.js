import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { AppContainer } from './containers/App';
import SettingsPage from './containers/SettingsPage';

import ProjectEditPage from './containers/ProjectEditPage';
import ProjectsListPage from './containers/ProjectsListPage';
import ProjectViewPage from './containers/ProjectViewPage';

import ProjectHistory from './components/ProjectHistory';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={ProjectsListPage} />
    <Route path="settings" component={SettingsPage} transition="custom" />
    <Route path="projects/:projectId" component={ProjectViewPage}>
      <IndexRoute />
      <Route path="history" component={ProjectHistory} />
    </Route>
    <Route path="project-editor(/:projectId)" component={ProjectEditPage} />
  </Route>
);
