import uuid from 'uuid/v4';

export const TAG = 'tag';
export const RESET_TAGS = 'reset_tags';
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

export const resetTags = () => ({type: RESET_TAGS});
