const SET_ALL_USERS = 'SET_ALL_USERS';
const CLEAR = "CLEAR";

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {}
}

const UsersReducer = (state= initialState, {type, payload}) =>{

  switch (type) {
    case SET_ALL_USERS: {
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
export { SET_ALL_USERS, CLEAR };
