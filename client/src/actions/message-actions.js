import { ERROR, SUCCESS } from './types';

export const errorMessage = (message) => ({
  type: ERROR,
  message
});

export const successMessage = (message) => ({
  type: SUCCESS,
  message
})
