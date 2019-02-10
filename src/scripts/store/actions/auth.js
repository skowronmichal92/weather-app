/*eslint no-unused-vars:0*/

import * as actionTypes from './actionTypes';

export const logIn = (user) => {
  return {
    type: actionTypes.LOG_IN,
    payload: { user }
  }
}

export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT,
  }
}
