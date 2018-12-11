const SET_ALL_GAMES = 'SET_ALL_GAMES';
const CLEAR = 'CLEAR';

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {},
}

const AllGamesReducer = (state= initialState, {type, payload}) =>{
  switch (type) {
    case SET_ALL_GAMES: {
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
export { SET_ALL_GAMES };
