import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { projects } from './projects.js';

const rootReducer = combineReducers({
  routing,
  projects
});

export default rootReducer;
