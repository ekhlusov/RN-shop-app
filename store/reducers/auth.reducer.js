import { AUTHENTICATE, LOGOUT } from '../actions/auth.actions';

const INITIAL_STATE = {
  token: null,
  userId: null
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        token: action.payload.token,
        userId: action.payload.userId
      };
    }

    case LOGOUT: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};
