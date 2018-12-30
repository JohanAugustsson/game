const SET_GAMES = 'SET_GAMES';
const ADD_GAME = 'ADD_GAME';
const CLEAR = "CLEAR";

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {},
}

const GameReducer = (state= initialState, {type, payload}) =>{

  switch (type) {
    case SET_GAMES: {
      return {...state, data: payload, isFetched: true }
    }
    case ADD_GAME: {
      return {...state, data: payload, isFetched: true }
    }
    case CLEAR: {
      return initialState
    }

    default:
      return state;
  }
}

export default GameReducer;
export { SET_GAMES, ADD_GAME, CLEAR };
