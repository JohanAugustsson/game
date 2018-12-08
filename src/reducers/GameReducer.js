const ADD_USER_TO_GAME = 'ADD_USER_TO_GAME';
const REMOVE_USER_FROM_GAME = 'REMOVE_USER_FROM_GAME';
const  ADD_GAME = ' ADD_GAME';
const CLEAR = "CLEAR";

const initialState = {
  isFetched: false,
  isFetching: false,
  data: {},
  members: {}
}

const GameReducer = (state= initialState, {type, payload}) =>{

  switch (type) {
    case ADD_USER_TO_GAME: {
      return {...state, members: payload }
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
export { ADD_USER_TO_GAME, REMOVE_USER_FROM_GAME,  ADD_GAME };
