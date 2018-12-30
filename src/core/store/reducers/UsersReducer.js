const SET_USERS = 'SET_USERS';
const CLEAR = "CLEAR";

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {}
}

const UsersReducer = (state= initialState, {type, payload}) =>{

  switch (type) {
    case SET_USERS: {
      return {...state, data: payload, isFetched: true }
    }
    case CLEAR: {
      return initialState
    }

    default:
      return state;
  }
}

export default UsersReducer;
export { SET_USERS, CLEAR };
