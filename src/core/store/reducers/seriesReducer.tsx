import {Reducer} from "redux";
import {BaseReducerState} from "./baseReducerState";

const SET_SERIES = "SET_SERIES";
const CLEAR = "CLEAR";
// const REMOVE_GROUP = 'REMOVE_GROUP';

const initialState: BaseReducerState = {
    isFetched: false,
    isFetching: false,
    data: {},
};

const SeriesReducer: Reducer<BaseReducerState> = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_SERIES: {
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
export {SET_SERIES};
