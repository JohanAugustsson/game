import {Reducer} from "redux";
import {BaseReducerState} from "./baseReducerState";

const SET_SERIE = "SET_SERIE";
const CLEAR = "CLEAR";
// const REMOVE_GROUP = 'REMOVE_GROUP';

const initialState: BaseReducerState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const SeriesReducer: Reducer<BaseReducerState> = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_SERIE: {
            return {...state, data: payload, isFetched: true};
        }
        case CLEAR: {
            return initialState;
        }

        default:
            return state;
    }
};

export default SeriesReducer;
export {SET_SERIE};
