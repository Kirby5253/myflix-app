import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER_INFO, SET_USER_FAVORITES } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userInfo(state = '', action) {
  switch (action.type) {
    case SET_USER_INFO:
      return action.value;
    default:
      return state;
  }
}

function userFavorites(state = [], action) {
  switch (action.type) {
    case SET_USER_FAVORITES:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userInfo,
  userFavorites,
});

export default moviesApp;
