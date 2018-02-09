import uuid from 'uuid/v4';

export const TAG = 'tag';
export const TAG_INPUT = 'tag_input';
export const HANDLE_INPUT = 'handle_input';

export const tag = (text, id) => ({
  type: TAG,
  text,
  id: id ? id : uuid(),
});

export const handleInput = (input) => ({
  type: HANDLE_INPUT,
  input
});
