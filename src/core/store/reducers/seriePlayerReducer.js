const SERIEPLAYERS_ADD_PLAYERS = 'SERIEPLAYER_ADD_PLAYERS';
const SERIEPLAYERS_ADD_PLAYER = 'SERIEPLAYER_ADD_PLAYER';
const CLEAR = 'SERIEPLAYER_CLEAR';

const initialState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const SeriePlayerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SERIEPLAYERS_ADD_PLAYERS: {
            return {...state, data: payload, isFetched: true}
        }
        case SERIEPLAYERS_ADD_PLAYER: {
            return {...state, data: {...state.data, [payload.uid]: payload}}
        }
        case CLEAR: {
            return initialState
        }
        default:
            return state;
    }
};

export default SeriePlayerReducer;
export {SERIEPLAYERS_ADD_PLAYER, SERIEPLAYERS_ADD_PLAYERS, CLEAR};
