import { ADD_PROJECT, SAVE_PROJECT } from '../actions/projects';

export function project(state = {}, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return action.project;
    case SAVE_PROJECT:
      if(state.id !== action.project.id) {
        return state;
      }

      return {
        ...state,
        ...action.project
      };
    default:
      return state;
  }
}

export function projects(state = [], action) {
  switch (action.type) {
    case ADD_PROJECT:
      return [
        ...state,
        project(undefined, action)
      ];
    case SAVE_PROJECT:
      return state.map(p => project(p, action));
    default:
      return state;
  }
}
