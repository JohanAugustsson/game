const SET_USER = 'SET_USER';
const CLEAR = "CLEAR";

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {}
}

const AuthReducer= (state= initialState, {type, payload}) =>{

  switch (type) {
    case SET_USER: {
      return {...state, data: payload}
    }
    case CLEAR: {
      return initialState
    }

    default:
      return state;
  }
}

export default AuthReducer;
export { SET_USER, CLEAR };
