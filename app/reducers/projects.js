import {
  ADD_PROJECT,
  SAVE_PROJECT,
  REMOVE_PROJECT
} from '../actions/projects';

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

const isEqual = (id, id2) => id === id2;

export function projects(state = [], action) {
  switch (action.type) {
    case ADD_PROJECT:
      return [
        ...state,
        project(undefined, action)
      ];
    case SAVE_PROJECT:
      return state.map(p => project(p, action));
    case REMOVE_PROJECT:
      return [
        ...state.slice(0, state.findIndex(p => isEqual(p.id, action.project.id))),
        ...state.slice(1 + state.findIndex(p => isEqual(p.id, action.project.id)))
      ];
    default:
      return state;
  }
}
