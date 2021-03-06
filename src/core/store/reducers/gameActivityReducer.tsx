import {Reducer} from "redux";
import {BaseReducerState} from "./baseReducerState";

const GAME_ACTIVITY_ADD_SCORE = "ADD_SCORE";
const GAME_ACTIVITY_ADD_ALL = "ADD_ALL";
const CLEAR = "CLEAR";

const initialState: BaseReducerState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const GameActivityReducer: Reducer<BaseReducerState> = (state = initialState, {type, payload}) => {
    switch (type) {
        case GAME_ACTIVITY_ADD_ALL: {
            return {...state, data: {...state.data, ...payload}, isFetched: true};
        }
        case GAME_ACTIVITY_ADD_SCORE: {
            return {...state, data: {...state.data, [payload.id]: payload}};
        }
        case CLEAR: {
            return initialState;
        }
        default:
            return state;
    }
};

export default GameActivityReducer;
export {GAME_ACTIVITY_ADD_SCORE, GAME_ACTIVITY_ADD_ALL};
