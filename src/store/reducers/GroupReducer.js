const ADD_GROUP = 'ADD_GROUP';
const CLEAR = "CLEAR";
// const REMOVE_GROUP = 'REMOVE_GROUP';

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {},
}

const GroupReducer = (state= initialState, {type, payload}) =>{

  switch (type) {
    case ADD_GROUP: {
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
export { ADD_GROUP };
