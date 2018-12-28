const GROUP_ADD_PLAYERS = 'GROUP_ADD_PLAYERS';
const GROUP_ADD_PLAYER = 'GROUP_ADD_PLAYER';
const CLEAR = 'CLEAR';

const initialState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const GroupPlayerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GROUP_ADD_PLAYERS: {
            return {...state, data: payload, isFetched: true}
        }
        case GROUP_ADD_PLAYER: {
            return {...state, data: {...state.data, [payload.uid]: payload}}
        }
        case CLEAR: {
            return initialState
        }
        default:
            return state;
    }
};

export default GroupPlayerReducer;
export {GROUP_ADD_PLAYERS, CLEAR, GROUP_ADD_PLAYER};
