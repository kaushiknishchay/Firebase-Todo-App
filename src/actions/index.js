export const addTodo = (title, text) => ({
  type: 'ADD_TODO',
  payload: {
    title,
    text,
  },
});

export const requestLogin = () => ({
  type: 'LOGIN_REQUEST',
});

export const saveUser = user => ({
  type: 'SAVE_USER_INFO',
  payload: user,
});

export const signOutUser = () => ({
  type: 'SIGN_OUT_USER',
});
