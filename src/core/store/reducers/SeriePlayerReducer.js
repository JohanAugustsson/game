const SET_SERIES_PLAYERS = 'SET_SERIES_PLAYERS';
const SET_SERIES_PLAYER = 'SET_SERIES_PLAYER';
const CLEAR = 'CLEAR';

const initialState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const SeriePlayerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_SERIES_PLAYERS: {
            return {...state, data: payload, isFetched: true}
        }
        case SET_SERIES_PLAYER: {
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
export {SET_SERIES_PLAYERS, CLEAR, SET_SERIES_PLAYER};
