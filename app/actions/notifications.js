export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export function clear() {
  return {
    type: CLEAR_MESSAGE
  };
}

export function notify(msg) {
  return {
    type: ADD_MESSAGE,
    msg
  };
}
