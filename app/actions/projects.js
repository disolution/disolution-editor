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

export function saveRemotes({ id, localPath }) {
  return dispatch => {
    if(localPath) {
      return folders.getProjectRemotes(localPath)
      .then(remotes => dispatch(save({
        id, remotes
      })));
    }
  };
}

export function saveFileStatuses({ id, localPath }) {
  return dispatch =>
    folders.getProjectStatus(localPath)
    .then(files => dispatch(save({
      id, files
    })));
}

export function saveProjectFromPath({ localPath }) {
  let loadedProject;
  return dispatch =>
    folders.findProjectInPath(localPath)
    .then(project => {
      loadedProject = project;
      return project ? folders.getProjectRemotes(localPath) : Promise.reject();
    })
    .then(remotes => {
      loadedProject.remotes = remotes;
      return folders.getProjectStatus(localPath);
    })
    // Finally save all together
    .then(files => {
      loadedProject.files = files;
      return dispatch(save({
        ...loadedProject, localPath
      }));
    });
}
