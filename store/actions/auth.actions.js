export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signUp = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWIJt6q_52dgQckJ1u50E7ux-wb_2fasE`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      throw new Error('An error occurred');
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: SIGNUP,
      payload: { token: resData.idToken, userId: resData.localId }
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWIJt6q_52dgQckJ1u50E7ux-wb_2fasE`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      throw new Error('An error occurred');
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: LOGIN,
      payload: { token: resData.idToken, userId: resData.localId }
    });
  };
};
