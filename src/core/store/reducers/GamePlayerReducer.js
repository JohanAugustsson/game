const GAMEPLAYER_INIT_PLAYERS = 'PLAYERS_INITIAL_ADD';
const GAMEPLAYER_ADD_UPDATE_PLAYERS = 'GAMEPLAYER_ADD_UPDATE_PLAYERS';
const GAMEPLAYER_ADD_PLAYER = 'ADD_PLAYER';
const CLEAR = 'CLEAR';

const initialState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const GamePlayerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GAMEPLAYER_INIT_PLAYERS: {
            return {...state, data: payload, isFetched: true}
        }
        case GAMEPLAYER_ADD_UPDATE_PLAYERS: {
            return {...state, data: {...state.data, ...payload}}
        }
        case GAMEPLAYER_ADD_PLAYER: {
            return {...state, data: {...state.data, [payload.uid]: payload}}
        }
        case CLEAR: {
            return initialState
        }
        default:
            return state;
    }
};

export default GamePlayerReducer;
export {GAMEPLAYER_ADD_UPDATE_PLAYERS, CLEAR, GAMEPLAYER_ADD_PLAYER, GAMEPLAYER_INIT_PLAYERS};
