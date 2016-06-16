export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export function update(settings) {
  return {
    type: UPDATE_SETTINGS,
    settings
  };
}
