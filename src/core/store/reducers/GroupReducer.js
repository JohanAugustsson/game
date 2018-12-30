const SET_GROUPS = 'SET_GROUPS';
const CLEAR = "CLEAR";
// const REMOVE_GROUP = 'REMOVE_GROUP';

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {},
}

const GroupReducer = (state= initialState, {type, payload}) =>{
  switch (type) {
    case SET_GROUPS: {
      return {...state, data: payload, isFetched: true }
    }
    case CLEAR: {
      return initialState
    }

    default:
      return state;
  }
}

export default GroupReducer;
export { SET_GROUPS };
