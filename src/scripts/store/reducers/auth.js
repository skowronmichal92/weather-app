import * as actionTypes from '../actions/actionTypes';

const initialState = {
  auth: false,
  user: null
};

const auth = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.LOG_IN: {
      return {
        ...state,
        auth: true,
        user: action.payload.user
      }
    }
    case actionTypes.LOG_OUT: {
      return {
        ...state,
        auth: false,
        user: null
      }
    }
    default: {
      return state;
    }
  }
};

export default auth;
