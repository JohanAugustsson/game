import {Reducer} from "redux";
import {BaseReducerState} from "./baseReducerState";

const SET_GAMES = "SET_GAMES";
const CLEAR = "CLEAR";

const initialState: BaseReducerState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const AllGamesReducer: Reducer<BaseReducerState> = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_GAMES: {
            return {...state, data: payload, isFetched: true};
        }
        case CLEAR: {
            return initialState;
        }

        default:
            return state;
    }
};

export default AllGamesReducer;
export {SET_GAMES};
