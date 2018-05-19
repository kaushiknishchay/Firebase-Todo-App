const initialState = {
  userInfo: {},
  loggingIn: false,
};

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        loggingIn: true,
      };
    case 'SAVE_USER_INFO':
      return {
        ...state,
        userInfo: payload,
      };
    case 'SIGN_OUT_USER':
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};
