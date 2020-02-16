import { LOGIN, SIGNUP } from '../actions/auth.actions';

const INITIAL_STATE = {
  token: null,
  userId: null
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        token: action.payload.token,
        userId: action.payload.userId
      };
    }
    case SIGNUP: {
      return {
        token: action.payload.token,
        userId: action.payload.userId
      };
    }
    default:
      return state;
  }
};
