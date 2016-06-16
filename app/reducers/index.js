import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { projects } from './projects.js';
import { notifyActions } from './notifications.js';
import { settings } from './settings.js';

const rootReducer = combineReducers({
  routing,
  settings,
  projects,
  notifyMessage: notifyActions
});

export default rootReducer;
