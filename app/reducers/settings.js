import {
  UPDATE_SETTINGS
} from '../actions/settings';

export function settings(state = {}, action) {
  const { settings: newSettings } = action;
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...newSettings
      };
    default:
      return state;
  }
}
