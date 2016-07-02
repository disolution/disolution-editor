import * as folders from '../utils/folders';

export const ADD_PROJECT = 'ADD_PROJECT';
export const SAVE_PROJECT = 'SAVE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export function add(project) {
  return {
    type: ADD_PROJECT,
    project
  };
}

export function save(project) {
  return {
    type: SAVE_PROJECT,
    project
  };
}

export function remove(project) {
  return {
    type: REMOVE_PROJECT,
    project
  };
}

export function getRemotes({ id, localPath }) {
  return dispatch => {
    if(localPath) {
      folders.getProjectRemotes(localPath)
      .then(remotes => dispatch(save({
        id, remotes
      })));
    } else {
      return Promise.reject(new Error('Project missing a local path to scan for git remotes'));
    }
  };
}
