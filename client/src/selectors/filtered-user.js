import { createSelector } from 'reselect';
import _ from 'lodash';

const userListSelected = state => state.user;
const userFiltered = state => state.filter;


const getFilteredUsers = (user, filter) => {
  const filtered = _.filter(
    user,
    {'username': filter }
  )
  return filtered;
}

export default createSelector(
  userListSelected,
  userFiltered,
  getFilteredUsers
);
