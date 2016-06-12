import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { projects } from './projects.js';
import { notifyActions } from './notifications.js';

const rootReducer = combineReducers({
  routing,
  projects,
  notifyMessage: notifyActions
});

export default rootReducer;
