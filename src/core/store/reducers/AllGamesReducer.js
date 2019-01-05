const SET_GAMES = 'SET_GAMES';
const CLEAR = 'CLEAR';

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {},
}

const AllGamesReducer = (state= initialState, {type, payload}) =>{
  switch (type) {
    case SET_GAMES: {
      return {...state, data: payload, isFetched: true }
    }
    case CLEAR: {
      return initialState
    }

    default:
      return state;
  }
}

export default AllGamesReducer;
export { SET_GAMES };
