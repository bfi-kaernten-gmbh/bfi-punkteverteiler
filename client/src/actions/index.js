export const FETCH_USER = 'fetch_user';
export const FETCH_USERLIST = 'fetch_userlist';
export const UPDATE_USER = 'update_user';

export function fetchUser() {
  return {
    type: FETCH_USER,
    payload: ''
  }
}

export function fetchUserList() {
  return {
    type: FETCH_USERLIST,
    payload: ''
  }
}
 export function updateUser(values, id, callback) {
   callback(values);
   return {
     type: UPDATE_USER,
     payload: values, id
   }
 }
