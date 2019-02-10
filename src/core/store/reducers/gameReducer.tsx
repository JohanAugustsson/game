import {Reducer} from "redux";
import {BaseReducerState} from "./baseReducerState";

export const SET_GAME = "SET_GAME";
export const ADD_GAME = "ADD_GAME";
export const CLEAR = "CLEAR";

const initialState: BaseReducerState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const GameReducer: Reducer<BaseReducerState> = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_GAME: {
            return {...state, data: payload, isFetched: true};
        }
        case ADD_GAME: {
            return {...state, data: payload, isFetched: true};
        }
        case CLEAR: {
            return initialState;
        }

        default:
            return state;
    }
};

export default GameReducer;
