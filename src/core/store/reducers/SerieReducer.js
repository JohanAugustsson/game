const SET_SERIES = 'SET_SERIES';
const CLEAR = "CLEAR";
// const REMOVE_GROUP = 'REMOVE_GROUP';

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {},
}

const SerieReducer = (state= initialState, {type, payload}) =>{
  switch (type) {
    case SET_SERIES: {
      return {...state, data: payload, isFetched: true }
    }
    case CLEAR: {
      return initialState
    }

    default:
      return state;
  }
}

export default SerieReducer;
export { SET_SERIES };
