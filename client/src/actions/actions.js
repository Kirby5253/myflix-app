export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER_INFO = 'SET_USER_INFO';

export function setMovies(value) {
  return {type: SET_MOVIES, value};
}

export function setFilter(value) {
  return {type: SET_FILTER, value};
}

export function setUserInfo(value) {
  return {type: SET_USER_INFO, value};
}