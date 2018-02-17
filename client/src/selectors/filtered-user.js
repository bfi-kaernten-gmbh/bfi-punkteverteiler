import { createSelector } from 'reselect';
import _ from 'lodash';

const userListSelector = state => state.user;
const filterSelector = state => state.filter;

const getFilteredUsers = (users, filter) => {
  const { input, by } = filter;
  if(input) {
    return _.filter(users, (user) => {
      return user[by].toLowerCase().search(input.toLowerCase()) !== -1;
    });
  } else {
    return [];
  }
}

export default createSelector(
  userListSelector,
  filterSelector,
  getFilteredUsers
);
