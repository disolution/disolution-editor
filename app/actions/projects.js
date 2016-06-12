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

// export function incrementIfOdd() {
//   return (dispatch, getState) => {
//     const { projects } = getState();
//
//     if (projects % 2 === 0) {
//       return;
//     }
//
//     dispatch(increment());
//   };
// }
//
// export function incrementAsync(delay = 1000) {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
