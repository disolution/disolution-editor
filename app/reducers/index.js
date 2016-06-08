import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import projects from './projects';

const rootReducer = combineReducers({
  projects,
  routing
});

export default rootReducer;
