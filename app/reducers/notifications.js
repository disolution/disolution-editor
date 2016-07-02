import { ADD_PROJECT, SAVE_PROJECT } from '../actions/projects';
import { UPDATE_SETTINGS } from '../actions/settings';
import { CLEAR_MESSAGE, ADD_MESSAGE } from '../actions/notifications';

export function notifyActions(state = '', action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return String(action.msg);
    case ADD_PROJECT:
      return 'Project added';
    case UPDATE_SETTINGS:
      return 'Settings saved';
    case CLEAR_MESSAGE:
      return '';
    default:
      return state;
  }
}
